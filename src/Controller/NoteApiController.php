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
    /**
     * @Route("/api/note", name="api_notes_index")
     * @Method({"GET"})
     */
    public function index()
    {
        $notes = $this->getDoctrine()
            ->getRepository(Note::class)
            ->findAll();

        $data = $this->get('jms_serializer')->serialize($notes, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/api/note/{id}", name="api_notes_get_delete")
     * @Method({"GET", "DELETE"})
     * @param Request $request
     * @param $id
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
     */
    public function getNote(Request $request, $id)
    {
        $note = $this->getDoctrine()
            ->getRepository(Note::class)
            ->find($id);
        if ($note) {
            if ($request->isMethod('GET')) {
                $data = $this->get('jms_serializer')->serialize($note, 'json');

                $response = new Response($data);
                $response->headers->set('Content-Type', 'application/json');

                return $response;
            }
            if ($request->isMethod('DELETE')) {
                $em = $this->getDoctrine()->getManager();
                $em->remove($note);
                $em->flush();
                return new JsonResponse(
                    array(
                        'status' => 'noteDeleted',
                        'message' => 'This note has been deleted'
                    )
                );
            }
        }
        else {
            return new JsonResponse(
                array(
                    'status' => 'noteNotFound',
                    'message' => 'This note does not exist'
                )
            );
        }
    }


    /**
     * @Route("/notes/edit/{id}", name="edit_note")
     * @param Request $request
     * @param Note $note
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
     */
    public function editNote(Request $request, Note $note)
    {

    }


    /**
     * @Route("/notes/new", name="new_notes")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
     */
    public function newNote(Request $request)
    {
    }
}