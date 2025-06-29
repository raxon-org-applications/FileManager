//{{RAX}}
import { address } from "/Application/FileManager/Module/Address.js";
import { directory } from "/Application/FileManager/Module/Directory.js";
import { file } from "/Application/FileManager/Module/File.js";
import { head } from "/Application/FileManager/Module/Head.js";
import { menu } from "/Application/FileManager/Module/Menu.js";
import { root } from "/Module/Web.js";
import { taskbar } from "/Application/Desktop/Module/Taskbar.js";
import { task } from "/Application/Desktop/Module/Task.js";
import { dialog } from "/Dialog/Module/Dialog.js";
import { language, translation } from "/Module/Translation.js";
import { version } from "/Module/Priya.js";
import user from "/Module/User.js";
require(
[
root() + 'Application/FileManager/Css/Indent.css?' + version(),
root() + 'Application/FileManager/Css/FileManager.css?' + version(),
root() + 'Dialog/Css/Dialog.css?' + version(),
root() + 'Js/Dropzone/5.9.2/min/dropzone.min.css?' + version(),
root() + 'Js/Dropzone/5.9.2/min/dropzone.min.js?' + version()
],
function(){
user.refreshUrl("{{server.url('api.workandtravel.world')}}User/Refresh/Token/");
user.loginUrl("{{route.get('user-login')}}");
language("{{language()}}");
translation.import("{{raw|export.translation('json-line')}}");
let active = file.data.get('active') ?? [];
active.push("{{$id}}");
file.data.set({
"controller" : "{{raw|object(config('controller'), 'json-line')}}",
"section.id" : "{{$id}}",
"active": active,
"route.backend.directory" : "{{server.url('api.workandtravel.world')}}FileSystem/List/Directory/",
"route.backend.file": "{{server.url('api.workandtravel.world')}}FileSystem/List/File/",
"route.backend.extension": "{{server.url('api.workandtravel.world')}}Entity/Extension/",
"route.backend.tree": "{{server.url('api.workandtravel.world')}}FileSystem/List/Tree/",
"route.backend.upload": "{{server.url('api.workandtravel.world')}}FileSystem/Upload/",
"route.backend.context.menu": "{{server.url('api.workandtravel.world')}}FileSystem/ContextMenu/",
"route.frontend.address.bar":"{{route.get($section.name + '-address-bar')}}",
"route.frontend.directory":"{{route.get($section.name + '-list-directory')}}",
"route.frontend.file": "{{route.get($section.name + '-list-file')}}",
"route.frontend.application": "{{route.get('application-open')}}",
"route.frontend.open": "{{route.get($section.name + '-file-open')}}",
"upload.max.filesize": 10486
});
task.active({
    "id": "{{$id}}",
    "namespace": "{{$section.name}}",
    "config": {
        "url": "{{server.url('api.workandtravel.world')}}Application/Config/FileManager/"
    },
    "sse" : {
        "url": "{{server.url('api.workandtravel.world')}}Task/?user.key=" + user.get('key') + '&channel=' + "{{$id}}",

    }
}, (config) => {
    console.log(config);
    taskbar.add("{{$section.name}}", "{{$id}}");
    menu.init();
    head.init();
    address.read(config);
    directory.read();
    dialog.init("{{$id}}");
//file.section_active("{{$id}}");
    taskbar.active("{{$id}}");
});




});
