<?php
namespace Package\Raxon\App\Filemanager\Trait;

use Raxon\Exception\DirectoryCreateException;
use Raxon\Exception\FileWriteException;
use Raxon\Exception\ObjectException;

use Raxon\Node\Module\Node;

use Exception;
trait Import {

    /**
     * @throws DirectoryCreateException
     * @throws FileWriteException
     * @throws ObjectException
     */
    public function role_system(): void
    {
        $object = $this->object();
        $package = $object->request('package');
        if($package){
            $node = new Node($object);
            $node->role_system_create($package);
        }
    }
}