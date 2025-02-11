{{R3M}}
<section name="main">
    <div class="logo">
        <a href="https://www.raxon.org/" title="https://www.raxon.org"><img src="{{config('domain.url')}}Icon/android-chrome-192x192.png" alt="Raxon Logo"></a>
    </div>
    <h1><a href="https://www.raxon.org/" title="https://www.raxon.org/">{{literal}}<strong>{{</strong>R3M<strong>}}</strong>{{/literal}}</a></h1>
    <h3>Debug</h3>
    {{if(config('framework.environment') === 'development')}}
    {{d(data())}}
    {{/if}}
</section>