<?php
/**
 * Created by PhpStorm.
 * User: Bluebeel
 * Date: 09-02-18
 * Time: 22:19
 */
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\Category;

class BaseController extends Controller
{
    public function getCategories()
    {
        $categories = $this->getDoctrine()
            ->getRepository(Category::class)
            ->findAll();

        return $this->render('sidebar.html.twig', array(
            'categories' => $categories
        ));
    }

}
?>