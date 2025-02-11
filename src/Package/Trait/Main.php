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
        $has_frontend = false;
        if(property_exists($options, 'frontend')){
            if(property_exists($options->frontend, 'host')){
                if(property_exists($options->frontend->host, 'name')){
                    $has_frontend = true;
                }
                if(property_exists($options->frontend->host, 'uuid')){
                    $has_frontend = true;
                }
            }
        }
        $has_backend = false;
        if(property_exists($options, 'backend')){
            if(property_exists($options->backend, 'host')){
                if(property_exists($options->backend->host, 'name')){
                    $has_backend = true;
                }
                if(property_exists($options->backend->host, 'uuid')){
                    $has_backend = true;
                }
            }
        }
        if($has_frontend === false){
            throw new Exception('Frontend.host option is required (frontend.host.name || frontend.host.uuid), aborting...');
        }
        if($has_backend === false){
            throw new Exception('Backend.host option is required (backend.host.name || backend.host.uuid), aborting...');
        }
    }

}