<?php
/**
 * Created by PhpStorm.
 * User: bluebeel
 * Date: 2/03/18
 * Time: 10:05
 */
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use App\Entity\Note;
use App\Entity\Category;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;


class NoteApiController extends Controller
{
    function getTags(array $notes, $tag)
    {
        $filtered = array_filter($notes, function ($u) use ($tag) {
            $xml = new \DOMDocument();
            print_r($u->getContent());
            $xml->loadXML($u->getContent()); // Or load if filename required
            $xpath = new \DOMXpath($xml);
            $elements = $xpath->query("/content/tag");
            $elements = array_map(function ($x) { return $x->nodeValue; }, iterator_to_array($elements));
            if (!is_null($elements)) {
                if (in_array($tag, $elements)) {
                    return $u;
                }
            }
        });
        return $filtered;
    }

    /**
     * @Route("/api/note", name="api_note_index")
     * @Method({"GET"})
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $notes = $this->getDoctrine()
            ->getRepository(Note::class)
            ->findAll();
        $q = $request->query->get("q");
        if ($q) {
            $notes = $this->getTags($notes, $q);
        }

        $data = $this->get('jms_serializer')->serialize($notes, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

    /**
     * @Route("/api/note", name="api_note_create")
     * @Method({"POST"})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
     */
    public function newNote(Request $request)
    {
        $noteManager = $this->getDoctrine()
            ->getManager();

        $content = $request->getContent();
        if (empty($content))
        {
            return new JsonResponse(
                array(
                    'status' => 'EMPTY',
                    'message' => 'The body of this request is empty.'
                )
            );
        }
        $note = $this->get('jms_serializer')->deserialize($content, Note::class, 'json');
        $note->setContent($note->getContent());
        $noteManager->persist($note);
        $noteManager->flush();
        $response = new JsonResponse(
            array(
                'status' => 'CREATED',
                'message' => 'The note has been created.'
            )
        );
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setStatusCode(Response::HTTP_CREATED);

        return $response;
    }

    /**
 * @Route("/api/note/{id}", name="api_note_delete")
 * @Method({"DELETE"})
 * @param $id
 * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
 */
    public function deleteNote($id)
    {
        $note = $this->getDoctrine()
            ->getRepository(Note::class)
            ->find($id);
        if ($note) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($note);
            $em->flush();
            $response = new JsonResponse(
                array(
                    'status' => 'DELETED',
                    'message' => 'This note has been deleted'
                )
            );
            $response->headers->set('Access-Control-Allow-Origin', '*');
            return $response;
        }
        else {
            return new JsonResponse(
                array(
                    'status' => 'NOT FOUND',
                    'message' => 'This note does not exist'
                )
            );
        }
    }

    /**
     * @Route("/api/note/{id}", name="api_note_get")
     * @Method({"GET"})
     * @param $id
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
     */
    public function getNote($id)
    {
        $note = $this->getDoctrine()
            ->getRepository(Note::class)
            ->find($id);
        if ($note) {
            $data = $this->get('jms_serializer')->serialize($note, 'json');
            $response = new Response($data);
            $response->headers->set('Content-Type', 'application/json');
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->setStatusCode(Response::HTTP_OK);

            return $response;
        }
        else {
            return new JsonResponse(
                array(
                    'status' => 'NOT FOUND',
                    'message' => 'This note does not exist'
                )
            );
        }
    }


    /**
     * @Route("/api/note/{id}", name="api_note_edit")
     * @Method({"PUT", "PATCH"})
     * @param Request $request
     * @param $id
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
     */
    public function editNote(Request $request, $id)
    {
        $noteManager = $this->getDoctrine()
            ->getManager();
        $content = $request->getContent();
        if (empty($content))
        {
            return new JsonResponse(
                array(
                    'status' => 'EMPTY',
                    'message' => 'The body of this request is empty.'
                )
            );
        }
        $note = $noteManager
            ->getRepository(Note::class)
            ->find($id);
        if ($note) {
            $note_request = $this->get('jms_serializer')->deserialize($content, Note::class, 'json');
            $note->setTitle($note_request->getTitle());
            $note->setContent($note_request->getContent());
            $note->setDate($note_request->getDate());
            $note->setCategory($note_request->getCategory());
            $noteManager->flush();
            $response = new Response(
                array(
                    'status' => 'UPDATED',
                    'message' => 'The note has been updated.'
                )
            );
            $response->headers->set('Content-Type', 'application/json');
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->setStatusCode(Response::HTTP_OK);

            return $response;
        }
        else {
            return new JsonResponse(
                array(
                    'status' => 'NOT FOUND',
                    'message' => 'This note does not exist'
                )
            );
        }
    }
}