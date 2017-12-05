<?php
namespace app\enums;
/**
 * Superclass for any Enum. It provides methods for checking an enum value,
 * get a string representation, get data for dropdowns or selects...
 *
 * How to use:
 *
 * Define an Enum subclass and define the enum values as constants. Ex:
 *
 * class MyEnum extends Enum
 * {
 *   const MY_ENUM_VALUE1 = "MY_VALUE_1";
 *   const MY_ENUM_VALUE2 = "MY_VALUE_2";
 * }
 *
 * (...)
 *
 * To fill a radio button:
 *
 * echo $form->radioButtonList( $model, 'enum_field', MyEnum::getValidValues() );
 *
 * To fill a dropdown
 *
 * echo $form->dropDownList( $model, 'enum_field', MyEnum::getDataForDropDown() );
 *
 * BE CAREFULL: all constants defined in the superclass will be added as enum values. If a
 * constant value is to be used without being part of the enum values, it may be defined as
 * a static field instead of const
 *
 * Version 2.0 (2011/04/21)
 * =======================
 * - Change interface to a cleaner version. Now it looks like MyEnum::getValidValues(); the
 * getEnum()-> part has been stripped out.
 *
 * Version 1.2 (2011/02/14)
 * =======================
 * - Fixed bug for radio buttons: now the values for options are the enum keys themselves, not a
 *   numeric index
 *
 *  * Version 1.1 (2011/02/12)
 * =======================
 * - Added method getEnum(). It's equivalent to getInstance(), but nicer ;)
 * - Fixed bug for dropdowns: now the values for options are the enum keys themselves, not a
 *   numeric index
 * - DBEnums provide a generic method to check the values against the DB. The user only has to
 *   provide the methods (when subclassing) getDBField() and getDBTable(), that must return the
 *   names of the field and table respectively that hold the values of the Enum in the DB. There's
 *   another method that can be subclassed to provide a condition (where) for the Enum check.
 *
 * Version 1.0 (2011/02/07)
 * =======================
 * - Initial release
 *
 * @author twocandles ( twocandles3000[at]hotmail[dot]com )
 */
abstract class Enum
{

    /**
     * Prevent creating from outside. Caches all enum values defined in
     * subclass
     */
    private function __construct()
    {

    }

    /**
     * Prevent cloning from outside
     */
    private function __clone()
    {

    }

    // Caching of values
    public $_allValues;
    public $_dropDownValues;
    // Constants for translation
    static private $I18N_CATEGORY = 'enums';

    /**
     * Retrieve through reflection the values of the enum (defined in
     * subclasses)
     * @return array with all valid enum values
     */
    private function getInternalValuesByReflection()
    {
        if( empty( $this->_allValues ) )
        {
            $reflection = new \ReflectionClass( get_class( $this ) );
            $consts = $reflection->getConstants();
            $this->_allValues = array( );
            foreach( $consts as $constName => $constValue )
            {
                $this->_allValues[] = $constValue;
            }
        }
        return $this->_allValues;
    }

    /**
     * Returns if $value is a valid enum value
     * @param string to check
     * @return bool
     */
    protected function _isValidValue( $value )
    {
        // Don't call $this->getValidValues() since it can be subclassed and
        // and lead to infinite recursion!
        $values = $this->getInternalValuesByReflection();
        $result = in_array( $value, $this->getInternalValuesByReflection() );
        return in_array( $value, $this->getInternalValuesByReflection() );
    }

    /**
     * Returns the translated description of the enum value
     * @param $value to translate
     * @return string translated value. If it does not exist, return $value itself
     */
    protected function _toString( $value )
    {
        if( !$this->_isValidValue( $value ) )
            throw new Exception( "Invalid enum value" );
        return \Yii::t( self::$I18N_CATEGORY, $value );
    }

    /**
     * Returns an array with the enum values (usefull for model rules validation)
     * @return array
     */
    protected function _getValidValues()
    {
        return $this->getInternalValuesByReflection();
    }

    /**
     * Returns an array ready to be used by a dropdown box with value as enum keys
     * and texts as translated values
     * @return array
     */
    protected function _getDataForDropDown()
    {
        if( !isset( $this->_dropDownValues ) )
        {
            $this->_dropDownValues = array( );
            foreach( $this->_getValidValues() as $value )
            {
                $this->_dropDownValues[$value] = $this->_toString( $value );
            }
        }
        return $this->_dropDownValues;
    }

    protected function _getDataForRadioButtonList()
    {
        return $this->_getDataForDropDown();
    }

    /**
     *
     * @return string
     */
    protected function _getEnumName()
    {
        return get_called_class();
    }

    // Singletons of every enum subclass
    static protected $_instances = array( );

    /**
     * Getter for instance
     * @return Enum
     */
    static private function getEnum()
    {
        $enumName = get_called_class();
        if( !isset( self::$_instances[$enumName] ) )
        {
            self::$_instances[$enumName] = new $enumName;
        }
        return self::$_instances[$enumName];
    }

    /**  As of PHP 5.3.0  */
    public static function __callStatic( $name, $arguments )
    {
        assert( is_callable( array( self::getEnum(), "_$name" ) ) );
        return call_user_func_array( array( self::getEnum(), "_$name" ), $arguments );
    }
}
