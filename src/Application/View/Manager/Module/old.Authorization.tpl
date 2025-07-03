{script('module')}
import {$ldelim} exception {$rdelim} from "/Module/Exception/Js/Exception.js";
import {$ldelim} request {$rdelim} from "/Module/Request/Js/Request.js";
exception.authorization(() => {$ldelim}
    request("{$url}");
{$rdelim});
{/script}