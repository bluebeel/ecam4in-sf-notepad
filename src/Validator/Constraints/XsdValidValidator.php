<?php
/**
 * Created by PhpStorm.
 * User: Bluebeel
 * Date: 09-04-18
 * Time: 16:46
 */
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class XsdValidValidator extends ConstraintValidator
{
    private $xsdValidation =
        "<xs:schema attributeFormDefault=\"unqualified\" elementFormDefault=\"qualified\" xmlns:xs=\"http://www.w3.org/2001/XMLSchema\">
          <xs:element name=\"content\">
            <xs:complexType mixed=\"true\">
              <xs:sequence>
                <xs:element type=\"xs:string\" name=\"tag\" maxOccurs=\"unbounded\" minOccurs=\"0\"/>
              </xs:sequence>
            </xs:complexType>
          </xs:element>
        </xs:schema>";

    public function validate($value, Constraint $constraint)
    {
        $xml = new \DOMDocument();
        $xml->loadXML($value, LIBXML_NOBLANKS); // Or load if filename required
        if (!$xml->schemaValidateSource($this->xsdValidation)) // Or schemaValidateSource if string used.
        {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ string }}', $value)
                ->addViolation();
        }
    }
}