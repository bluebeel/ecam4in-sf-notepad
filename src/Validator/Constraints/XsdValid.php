<?php
/**
 * Created by PhpStorm.
 * User: Bluebeel
 * Date: 09-04-18
 * Time: 16:43
 */
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class XsdValid extends Constraint
{
    public $message = 'The xml "{{ string }}" is invalid.';
}