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

class CategoryController extends Controller
{
    /**
     * @Route("/categories/{id}", name="category_show")
     * @param mixed $category
     * @return mixed
     */
    public function show(Category $category)
    {
        $notes = $category->getNotes();

        return $this->render('note/index.html.twig', array(
            'notes' => $notes,
        ));
    }

    /**
     * @Route("/categories/new", name="new_category")
     * @param mixed $request
     * @return mixed
     */
    public function newCategory(Request $request)
    {

    }
}
?>