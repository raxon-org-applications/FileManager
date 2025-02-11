{{R3M}}
{{$register = Package.Raxon.App.FileManager:Init:register()}}
{{if(!is.empty($register))}}
{{Package.Raxon.App.FileManager:Import:role.system()}}
{{$options = options()}}
{{Package.Raxon.App.FileManager:Main:install($options)}}
{{/if}}