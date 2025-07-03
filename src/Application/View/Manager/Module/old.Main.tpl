{{RAX}}
{{script('module')}}
import {{$ldelim}} address {{$rdelim}} from "/Application/FileManager/Js/Init.js";
import {{$ldelim}} directory {{$rdelim}} from "/Application/FileManager/Js/Directory.js";
import {{$ldelim}} file {{$rdelim}} from "/Application/FileManager/Js/File.js";
import {{$ldelim}} head {{$rdelim}} from "/Application/FileManager/Js/Head.js";
import {{$ldelim}} menu {{$rdelim}} from "/Application/FileManager/Js/Menu.js";
import {{$ldelim}} root {{$rdelim}} from "/Module/Web.js";
import {{$ldelim}} taskbar {{$rdelim}} from "/Navigation/Module/Taskbar.js";
import {{$ldelim}} language, translation {{$rdelim}} from "/Module/Translation.js";
//import {{$ldelim}} require {{$rdelim}} from "/Module/Require.js";
import {{$ldelim}} version {{$rdelim}} from "/Module/Priya.js";
import  user from "/Module/User.js";
require(
[
root() + 'Application/FileManager/Css/Indent.css?' + version(),
root() + 'Application/FileManager/Css/FileManager.css?' + version(),
root() + 'Dialog/Css/Dialog.css?' + version(),
root() + 'Dialog/Js/Dialog.js?' + version(),
root() + 'Js/Dropzone/5.9.2/min/dropzone.min.css?' + version(),
root() + 'Js/Dropzone/5.9.2/min/dropzone.min.js?' + version()
],
function(){{$ldelim}}
user.refreshUrl("{{server.url('api')}}User/Refresh/Token/");
language("{{language()}}");
translation.import({{export.translation('json-line')}});
file.data.set({{$ldelim}}
"controller" : {{object($controller, 'json-line')}},
"section.id" : "{{$id}}",
"route.backend.directory" : "{{server.url('api')}}FileSystem/List/Directory/",
"route.backend.file": "{{server.url('api')}}FileSystem/List/File/",
"route.backend.open": "{{server.url('api')}}Application/Open/",
"route.backend.tree": "{{server.url('api')}}FileSystem/List/Tree/",
"route.backend.upload": "{{server.url('api')}}FileSystem/Upload/",
"route.frontend.address.bar":"{{route.get(route.prefix() + '-'+ $section.name + '-address-bar')}}",
"route.frontend.directory":"{{route.get(route.prefix() + '-'+ $section.name + '-list-directory')}}",
"route.frontend.file": "{{route.get(route.prefix() + '-'+ $section.name + '-list-file')}}",
"route.frontend.open": "{{route.get(route.prefix() + '-application-open')}}",
"upload.max.filesize": 1512
{{$rdelim}});
taskbar.add("{{$section.name}}", "{{$id}}");
menu.init();
head.init();
address.read();
directory.read();
_('dialog').collection('section.name', "{{$section.name}}");
_('dialog').run("{{$id}}");
{{$rdelim}});
{{/script}}