<?php
namespace Domain\Example_Com\Controller;

use Raxon\App;
use Raxon\Config;

use Raxon\Module\Cache;
use Raxon\Module\Controller;
use Raxon\Module\Host;

use Exception;

use Raxon\Exception\DirectoryCreateException;
use Raxon\Exception\FileWriteException;
use Raxon\Exception\ObjectException;
use Raxon\Exception\LocateException;
use Raxon\Exception\UrlEmptyException;
use Raxon\Exception\UrlNotExistException;

class Index extends Controller {
    const DIR = __DIR__ . DIRECTORY_SEPARATOR;
    const HTML = 'Html';
    const JSON = 'Json';
    const MAIN = 'Main';
    const NAME = 'Index';

    const CACHE_ROUTE_REQUEST_EXPOSE = [
        'page'
    ];

    /**
     * @throws ObjectException
     * @throws UrlEmptyException
     * @throws UrlNotExistException
     * @throws FileWriteException
     * @throws LocateException
     * @throws Exception
     */
    public static function main(App $object): string
    {
        $logger = false;
        if($object->config('framework.environment') === Config::MODE_DEVELOPMENT){
            $logger = $object->config('project.log.debug');
        }
        if($logger){
            $duration = (microtime(true) - $object->config('time.start')) * 1000;
            $object->logger($logger)->info('Duration: ' . $duration . ' ms', [ 'main' ]);
        }
        $start = microtime(true);
        $contentType = App::contentType($object);
        if($contentType == App::CONTENT_TYPE_HTML){
            $cache_key = Cache::key($object, [
                'name' => Cache::name($object, [
                    'type' => Cache::ROUTE,
                    'extension' => $object->config('extension.html'),
                    'expose' => Index::CACHE_ROUTE_REQUEST_EXPOSE
                ]),
                'ttl' => Cache::INF,
                'route' => true, // key based on route
                'host' => true, // key based on host
                'scheme' => Host::scheme(),
                'content_type' => $contentType,
                'expose' => Index::CACHE_ROUTE_REQUEST_EXPOSE
            ]);
            $url = $object->config('controller.dir.data') .
                Index::NAME .
                $object->config('ds') .
                Index::HTML .
                $object->config('ds') .
                ucfirst(__FUNCTION__) .
                $object->config('extension.json')
            ;
            $view = Cache::read($object, [
                'key' => $cache_key,
                'ttl' => Cache::INF,
            ]);
            if($view === null){
                Index::parse_read($object, $url);
                $object->set('template.name', Index::MAIN . '/' . Index::MAIN);
                $url = Index::locate($object);
                $view = Index::response($object, $url);
                Cache::write($object, [
                    'key' => $cache_key,
                    'data' => $view
                ]);
            }
        } else {
            $cache_key = Cache::key($object, [
                'name' => Cache::name($object, [
                    'type' => Cache::ROUTE,
                    'extension' => $object->config('extension.json'),
                    'expose' => Index::CACHE_ROUTE_REQUEST_EXPOSE
                ]),
                'ttl' => Cache::INF,
                'route' => true, // key based on route
                'host' => true, // key based on host
                'scheme' => Host::scheme(),
                'content_type' => $contentType,
                'expose' => Index::CACHE_ROUTE_REQUEST_EXPOSE
            ]);
            $url = $object->config('controller.dir.data') .
                Index::NAME .
                $object->config('ds') .
                Index::JSON .
                $object->config('ds') .
                ucfirst(__FUNCTION__) .
                $object->config('extension.json')
            ;
            $view = Cache::read($object, [
                'key' => $cache_key,
                'ttl' => Cache::INF,
            ]);
            if($view === null){
                Index::parse_read($object, $url);
                $url = Index::locate($object);
                $view = Index::response($object, $url);
                Cache::write($object, [
                    'key' => $cache_key,
                    'data' => $view
                ]);
            }
        }
        if($logger){
            $duration = (microtime(true) - $start) * 1000;
            $object->logger($logger)->info('Duration: ' . $duration . ' ms', [ $cache_key ]);
        }
        return $view;
    }

    /**
     * @throws ObjectException
     * @throws UrlEmptyException
     * @throws UrlNotExistException
     * @throws FileWriteException
     * @throws LocateException
     * @throws DirectoryCreateException
     * @throws Exception
     */
    public static function debug(App $object): string
    {
        if($object->config('framework.environment') !== Config::MODE_DEVELOPMENT){
            throw new Exception('Debug only available in development mode...');
        }
        $contentType = App::contentType($object);
        if($contentType == App::CONTENT_TYPE_HTML){
            $cache_key = Cache::key($object, [
                'name' => Cache::name($object, [
                    'type' => Cache::ROUTE,
                    'extension' => $object->config('extension.html'),
                    'expose' => Index::CACHE_ROUTE_REQUEST_EXPOSE
                ]),
                'ttl' => Cache::INF,
                'route' => true, // key based on route
                'host' => true, // key based on host
                'scheme' => Host::scheme(),
                'content_type' => $contentType,
                'expose' => Index::CACHE_ROUTE_REQUEST_EXPOSE
            ]);
            $url = $object->config('controller.dir.data') .
                Index::NAME .
                $object->config('ds') .
                Index::HTML .
                $object->config('ds') .
                ucfirst(__FUNCTION__) .
                $object->config('extension.json')
            ;
            $view = Cache::read($object, [
                'key' => $cache_key,
                'ttl' => Cache::INF,
            ]);
            $view = null;
            if($view === null){
                Index::parse_read($object, $url);
                $object->set('template.name', Index::MAIN . '/' . Index::MAIN);
                $url = Index::locate($object);
                $view = Index::response($object, $url);
                Cache::write($object, [
                    'key' => $cache_key,
                    'data' => $view
                ]);
            }
        } else {
            $cache_key = Cache::key($object, [
                'name' => Cache::name($object, [
                    'type' => Cache::ROUTE,
                    'extension' => $object->config('extension.json'),
                    'expose' => Index::CACHE_ROUTE_REQUEST_EXPOSE
                ]),
                'ttl' => Cache::INF,
                'route' => true, // key based on route
                'host' => true, // key based on host
                'scheme' => Host::scheme(),
                'content_type' => $contentType,
                'expose' => Index::CACHE_ROUTE_REQUEST_EXPOSE
            ]);
            $url = $object->config('controller.dir.data') .
                Index::NAME .
                $object->config('ds') .
                Index::JSON .
                $object->config('ds') .
                ucfirst(__FUNCTION__) .
                $object->config('extension.json')
            ;
            $view = Cache::read($object, [
                'key' => $cache_key,
                'ttl' => Cache::INF,
            ]);
            if($view === null){
                Index::parse_read($object, $url);
                $url = Index::locate($object);
                $view = Index::response($object, $url);
                Cache::write($object, [
                    'key' => $cache_key,
                    'data' => $view
                ]);
            }
        }
        return $view;
    }
}
