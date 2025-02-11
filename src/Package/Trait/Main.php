<?php
namespace Package\Raxon\App\Filemanager\Trait;

use Raxon\App;
use Raxon\Config;

use Raxon\Exception\FileWriteException;
use Raxon\Module\Dir;
use Raxon\Module\Core;
use Raxon\Module\Event;
use Raxon\Module\File;
use Raxon\Module\Host;
use Raxon\Module\Parse;
use Raxon\Module\Sort;

use Raxon\Node\Model\Node;

use Exception;

use Raxon\Exception\DirectoryCreateException;
use Raxon\Exception\ObjectException;
trait Main {

    /**
     * @throws DirectoryCreateException
     * @throws Exception
     */
    public function install($options=[]): void
    {
        $options = Core::object($options, Core::OBJECT_OBJECT);
        $object = $this->object();
        if($object->config(Config::POSIX_ID) !== 0){
            return;
        }
        breakpoint($options);
        $has_host = false;
        if(property_exists($options, 'host.name')){
            $has_host = true;
        }
        if(property_exists($options, 'host.uuid')){
            $has_host = true;
        }
        if($has_host === false){
            throw new Exception('Host option is required (host.name || host.uuid), aborting...');
        }
    }

}