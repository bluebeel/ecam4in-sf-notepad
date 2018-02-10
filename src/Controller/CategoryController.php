<?php
/**
 * Created by PhpStorm.
 * User: Bluebeel
 * Date: 09-02-18
 * Time: 22:05
 */
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\Category;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class CategoryController extends Controller
{
    /**
     * @Route("/categories", name="categories")
     */
    public function index()
    {
        $categories = $this->getDoctrine()
            ->getRepository(Category::class)
            ->findAll();

        return $this->render('category/index.html.twig', array(
            'categories' => $categories,
        ));
    }

    /**
     * @Route("/categories/new", name="new_category")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
     */
    public function newCategory(Request $request)
    {
        $category = new Category();
        $category->setLibelle('Write a libelle');

        $form = $this->createFormBuilder($category)
            ->add('libelle', TextType::class)
            ->add('save', SubmitType::class, array('label' => 'Create Category'))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            $category = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($category);
            $em->flush();

            return $this->redirectToRoute('categories');
        }

        return $this->render('category/newCategory.html.twig', array(
            'form' => $form->createView(),
        ));
    }

    /**
     * @Route("/categories/{id}", name="category_show")
     * @param Category $category
     * @return Response
     */
    public function showNotesFromCategory(Category $category)
    {
        $notes = $category->getNotes();

        return $this->render('note/index.html.twig', array(
            'notes' => $notes,
        ));
    }

    /**
     * @Route("/categories/delete/{id}", name="category_delete")
     * @param Category $category
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function delete(Category $category)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($category);
        $em->flush();
        return $this->redirectToRoute('categories');
    }
}
?>