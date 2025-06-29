<?php
/**
 * @author          Remco van der Velde
 * @since           2020-09-13
 * @copyright       Remco van der Velde
 * @license         MIT
 * @version         1.0
 * @changeLog
 *     -            all
 */
use stdClass;
use Raxon\Module\Parse;
use Raxon\Module\Data;

function function_file_manager_tree_directory(Parse $parse, Data $data, $node='',  $li='', $type=''){
    $options = [];
    $options['node'] = $node;
    $options['li']  = $li;
    $options['type'] = $type;
    $object = $parse->object();
    return \Domain\Admin_Workandtravel_World\Application\FileManager\Service\File::manager_tree_directory($object, $options);
}
