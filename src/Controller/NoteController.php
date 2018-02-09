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
    /**
     * @Route("/", name="notes")
     */
    public function index()
    {
        $notes = $this->getDoctrine()
            ->getRepository(Note::class)
            ->findAll();

        return $this->render('note/index.html.twig', array(
            'notes' => $notes,
        ));
    }

    /**
     * @Route("/notes/new", name="new_notes")
     * @param mixed $request
     * @return mixed
     */
    public function newNote(Request $request)
    {
        // creates a task and gives it some dummy data for this example
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
            // but, the original `$task` variable has also been updated
            $note = $form->getData();

            // ... perform some action, such as saving the task to the database
            // for example, if Task is a Doctrine entity, save it!
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