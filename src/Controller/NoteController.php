<?php
/**
 * Created by PhpStorm.
 * User: bluebeel
 * Date: 9/02/18
 * Time: 11:02
 */
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\Note;
use App\Entity\Category;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class NoteController extends Controller
{
    function getTags(array $notes, $tag)
    {
        $filtered = array_filter($notes, function ($u) use ($tag) {
            $xml = new \DOMDocument();
            $xml->loadXML($u->getContent(), LIBXML_NOBLANKS); // Or load if filename required
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
     * @Route("/", name="notes")
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $notes = $this->getDoctrine()
            ->getRepository(Note::class)
            ->findBy(array(), array('id' => 'desc'));
        $q = $request->query->get("q");
        if ($q) {
            $notes = $this->getTags($notes, $q);
        }

        return $this->render('note/index.html.twig', array(
            'notes' => $notes,
        ));
    }

    /**
     * @Route("/notes/delete/{id}", name="delete_note")
     * @param Note $note
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deleteNote(Note $note)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($note);
        $em->flush();
        return $this->redirectToRoute('notes');
    }

    /**
     * @Route("/notes/edit/{id}", name="edit_note")
     * @param Request $request
     * @param Note $note
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
     */
    public function editNote(Request $request, Note $note)
    {
        $form = $this->createFormBuilder($note)
            ->add('title', TextType::class)
            ->add('date', DateType::class)
            ->add('content', TextType::class)
            ->add('category', EntityType::class, array(
                'class' => Category::class,
                'choice_label' => 'libelle'
            ))
            ->add('save', SubmitType::class, array('label' => 'Edit Note'))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            $note = $form->getData();

            $em = $this->getDoctrine()->getManager();
            $em->persist($note);
            $em->flush();

            return $this->redirectToRoute('notes');
        }

        return $this->render('note/newNote.html.twig', array(
            'form' => $form->createView(),
        ));

    }


    /**
     * @Route("/notes/new", name="new_notes")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
     */
    public function newNote(Request $request)
    {
        $note = new Note();
        $note->setTitle('Write a title');
        $note->setDate(new \DateTime('today'));

        $form = $this->createFormBuilder($note)
            ->add('title', TextType::class)
            ->add('date', DateType::class)
            ->add('content', TextType::class)
            ->add('category', EntityType::class, array(
                'class' => Category::class,
                'choice_label' => 'libelle'
            ))
            ->add('save', SubmitType::class, array('label' => 'Create Note'))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            $note = $form->getData();

            $em = $this->getDoctrine()->getManager();
            $em->persist($note);
            $em->flush();

            return $this->redirectToRoute('notes');
        }

        return $this->render('note/newNote.html.twig', array(
            'form' => $form->createView(),
        ));
    }
}
?>