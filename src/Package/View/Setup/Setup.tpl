{{R3M}}
{{$register = Package.Raxon.Application.FileManager:Init:register()}}
{{if(!is.empty($register))}}
{{Package.Raxon.Application.FileManager:Import:role.system()}}
{{$options = options()}}
{{Package.Raxon.Application.FileManager:Main:install($options)}}
{{/if}}