<?php
/**
 * @package Plugin\Modifier
 * @author Remco van der Velde
 * @since 2024-08-19
 * @license MIT
 * @version 1.0
 * @changeLog
 *    - all
 */
namespace Plugin;

use Domain\Admin_Workandtravel_World\Application\Filemanager\Service\File;

trait File_Manager_Tree_Directory {

    protected function file_manager_tree_directory($node='', $li='', $type=''): string
    {
        $options = [];
        $options['node'] = $node;
        $options['li']  = $li;
        $options['type'] = $type;
        $object = $this->object();
        return File::manager_tree_directory($object, $options);
    }

}