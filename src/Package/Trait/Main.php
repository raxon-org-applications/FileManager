<?php
namespace Package\Raxon\App\Filemanager\Trait;

use Raxon\App;
use Raxon\Config;

use Raxon\Exception\FileWriteException;
use Raxon\Module\Data;
use Raxon\Module\Dir;
use Raxon\Module\Core;
use Raxon\Module\Event;
use Raxon\Module\File;
use Raxon\Module\Host;
use Raxon\Module\Sort;

use Raxon\Node\Model\Node;

use Package\Raxon\Parse\Service\Parse;

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
                    $frontend_options = [
                        'where' => [
                            [
                                'value' => $options->frontend->host->name,
                                'attribute' => 'name',
                                'operator' => '===',
                            ]
                        ]
                    ];
                }
                if(property_exists($options->frontend->host, 'uuid')){
                    $has_frontend = true;
                    $frontend_options = [
                        'where' => [
                            [
                                'value' => $options->frontend->host->uuid,
                                'attribute' => 'uuid',
                                'operator' => '===',
                            ]
                        ]
                    ];
                }
            }
        }
        $has_backend = false;
        if(property_exists($options, 'backend')){
            if(property_exists($options->backend, 'host')){
                if(property_exists($options->backend->host, 'name')){
                    $has_backend = true;
                    $backend_options = [
                        'where' => [
                            [
                                'value' => $options->backend->host->name,
                                'attribute' => 'name',
                                'operator' => '===',
                            ]
                        ]
                    ];
                }
                if(property_exists($options->backend->host, 'uuid')){
                    $has_backend = true;
                    $backend_options = [
                        'where' => [
                            [
                                'value' => $options->backend->host->uuid,
                                'attribute' => 'uuid',
                                'operator' => '===',
                            ]
                        ]
                    ];
                }
            }
        }
        if($has_frontend === false){
            throw new Exception('Frontend.host option is required (frontend.host.name || frontend.host.uuid), aborting...');
        }
        if($has_backend === false){
            throw new Exception('Backend.host option is required (backend.host.name || backend.host.uuid), aborting...');
        }
        $class = 'System.Host';
        $node = new Node($object);
        $response_frontend = $node->record($class, $node->role_system(), $frontend_options);
        $response_backend = $node->record($class, $node->role_system(), $backend_options);
        $dir_read = $object->config('project.dir.vendor') .
            $object->request('package') .
            $object->config('ds') .
            'src' .
            $object->config('ds') .
            $object->config('dictionary.application') .
            $object->config('ds')
        ;
        $dir_application = $object->config('project.dir.domain') .
            $response_frontend['node']->name .
            $object->config('ds') .
            $object->config('dictionary.application') .
            $object->config('ds')
        ;
        $dir_target = $dir_application .
            'Filemanager' .
            $object->config('ds')
        ;
        if(!File::exist($dir_target)){
            Dir::create($dir_target, Dir::CHMOD);
            File::permission($object, [
                'target' => $dir_target,
            ]);
        }
        $dir = new Dir();
        $read = $dir->read($dir_read, true);
        foreach($read as $nr => $file){
            $explode = explode($dir_read, $file->url, 2);
            if(array_key_exists(1, $explode)){
                $file->target = $dir_target . $explode[1];
            }
        }
        foreach($read as $nr => $file){
            if($file->type === Dir::TYPE){
                if(!File::exist($file->target)){
                    Dir::create($file->target, Dir::CHMOD);
                    File::permission($object, [
                        'target' => $file->target,
                    ]);
                }
            }
        }
        foreach($read as $nr => $file){
            if($file->type === File::TYPE){
                if(!File::exist($file->target)){
                    $file->extension = File::extension($file->target);
                    if($file->extension === 'rax'){
                        $explode = explode('.rax', $file->target, 2);
                        if(array_key_exists(1, $explode)){
                            $file->target = $explode[0];
                        }
                        $data = new Data();
                        $parse = new Parse($object, $data);
                        $content = $parse->compile(File::read($file->url));
                        d($file);
                        ddd($content);
                    } else {
                        ddd($file);
                    }
                    /*
                    File::permission($object, [
                        'target' => $file->target,
                    ]);
                    */
                }
            }
        }
    }

}