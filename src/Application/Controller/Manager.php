<?php
namespace Domain\Admin_Workandtravel_World\Application\Filemanager\Controller;

use Raxon\App;
use Raxon\Module\Server;
use Raxon\Module\Controller;

use Package\Raxon\Account\Service\Jwt;

use Raxon\Exception\LocateException;
use Raxon\Exception\UrlEmptyException;
use Raxon\Exception\UrlNotExistException;
use Raxon\Exception\ObjectException;
use Raxon\Exception\FileWriteException;

class Manager extends Controller {
    const DIR = __DIR__ . DIRECTORY_SEPARATOR;

    /**
     * @throws LocateException
     * @throws ObjectException
     * @throws UrlEmptyException
     * @throws UrlNotExistException
     * @throws FileWriteException
     */
    public static function main(App $object){
        $name = Manager::name(__FUNCTION__ , __CLASS__, '/');
        $url = Manager::locate($object, $name);
        /* unsafe code below, frontend should not do backend tasks
        $token = Server::token();
        $token_unencrypted = Jwt::decryptToken($object, $token);
        $claims = $token_unencrypted->claims();
        if($claims->has('user')) {
            $user = $claims->get('user');
            if(array_key_exists('uuid', $user)){
                ddd($user['uuid']);
            }
        }
        */

        return Manager::response($object, $url);
    }

    /**
     * @throws LocateException
     * @throws ObjectException
     * @throws UrlEmptyException
     * @throws UrlNotExistException
     * @throws FileWriteException
     */
    public static function list_directory(App $object){
        $name = Manager::name(__FUNCTION__ , __CLASS__, '/');
        $url = Manager::locate($object, $name);
        $object->config('response.url', $url);
        return Manager::response($object, $url);
    }

    /**
     * @throws LocateException
     * @throws ObjectException
     * @throws UrlEmptyException
     * @throws UrlNotExistException
     * @throws FileWriteException
     */
    public static function list_file(App $object){
        $name = Manager::name(__FUNCTION__ , __CLASS__, '/');
        $url = Manager::locate($object, $name);
        return Manager::response($object, $url);
    }

    /**
     * @throws LocateException
     * @throws ObjectException
     * @throws UrlEmptyException
     * @throws UrlNotExistException
     * @throws FileWriteException
     */
    public static function address_bar(App $object){
        $name = Manager::name(__FUNCTION__ , __CLASS__, '/');
        $url = Manager::locate($object, $name);
        return Manager::response($object, $url);
    }
}
