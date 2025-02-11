import { date } from "/Module/Date.js";
import { getSectionById } from "/Module/Section.js";
//import { header } from "/Module/Header/Js/Header.js";
import { object } from "/Module/Object.js";
import { exception } from "/Module/Exception.js";
//import { request } from "/Module/Request/Js/Request.js";
import { round } from "/Module/Round.js";
import { table } from "/Module/Table.js";
import { taskbar } from "/Application/Desktop/Module/Taskbar.js";
import { __ } from "/Module/Translation.js";
import create from "/Module/Create.js";
import user from "/Module/User.js";
import login from "/User/Module/Login.js";

let file = {};
file.data = {
    data : {},
    set : (attribute, value) => {
        if(typeof attribute === 'object'){
            for(let attr in attribute){
                object.set(attr, attribute[attr], file.data.data);
            }
        } else {
            object.set(attribute, value, file.data.data);
        }
    },
    has : (attribute) => {
        return object.has(attribute, file.data.data);
    },
    get : (attribute) => {
        return object.get(attribute, file.data.data);
    },
    delete : (attribute) => {
        return object.delete(attribute, file.data.data);
    }
};

file.read = () => {

    console.log(file.data.get());
}

file.header = (thead, tr) => {
    let th = create('th');
    tr.appendChild(th);
    th = create('th');
    th.html(__('file.manager.name'));
    tr.appendChild(th);
    th = create('th');
    th.html(__('file.manager.modified'));
    tr.appendChild(th);
    th = create('th');
    th.html(__('file.manager.type'));
    tr.appendChild(th);
    th = create('th');
    th.html(__('file.manager.size'));
    tr.appendChild(th);
    thead.appendChild(tr);
    return thead;
}

file.size = (size) => {
    const bytes = 1024;
    if(size > bytes * bytes * bytes * bytes){
        size = round(size / (bytes * bytes * bytes * bytes), 2) + ' ' + __('file.manager.TB');
    }
    else if(size > bytes * bytes * bytes){
        size = round(size / (bytes * bytes * bytes), 2) + ' ' + __('file.manager.GB');
    }
    else if(size > bytes * bytes){
        size = round(size / (bytes * bytes), 2) + ' ' + __('file.manager.MB');
    }
    else if(size > bytes){
        size = round(size / bytes, 2) + ' ' + __('file.manager.KB');
    } else {
        size += ' ' + __('file.manager.B');
    }
    return size;
}

file.context_menu = ({
    event,
    node,
    section,
    tr
}) => {
    let dialog = section.select('.dialog');
    let td_icon = tr.select('.icon');
    let create_div = section.select('.context-menu');
    if(!create_div){
        create_div = create('div');
        create_div.addClass('context-menu');
    } else {
        console.log(dialog.style.zIndex);
    }
    let calculate = tr.calculate('all');
    create_div.style.top = calculate.top + 'px';
    create_div.style.left = calculate.left + 'px';
    // create_div.style.top = event.clientY + 'px';
    // create_div.style.left = event.clientX + 'px';
    create_div.style.zIndex = parseInt(dialog.style.zIndex) + 1;
    /*
    let ul = create_div.select('ul');
    if(!ul){
        ul = create('ul');
    } else {
        ul.html('');
    }
    let li = create('li', 'header');
    li.html('<h3><i class="keyboard-shortcut">esc</i> Context-menu <i class="icon fas fa-window-close"></i></h3>')
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">enter</i>' + __('file.manager.open'));
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target?.closest('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut?.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target?.closest('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut?.removeClass('active');
        }
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-x</i>' + __('file.manager.cut'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-c</i>' + __('file.manager.copy'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-v</i>' + __('file.manager.paste'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">del</i>' + __('file.manager.delete'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    ul.appendChild(li);
    li = create('li', 'divider');
    li.html('');
    ul.appendChild(li);

    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F1</i>' + __('file.manager.download.raw'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F2</i>' + __('file.manager.download.zip'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F3</i>' + __('file.manager.upload.panel'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F4</i>' + __('file.manager.backup'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F5</i>' + __('file.manager.restore'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li', 'divider');
    li.html('');
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F6</i>' + __('file.manager.refresh.file.list'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F7</i>' + __('file.manager.sort.by') + '->');
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    li.on('click', (event) => {
        //context-menu-item
        file.context_menu_item({
            'event' : event,
            'node' : node,
            'section' : section,
            'tr' : tr,
            'li' : li
        });
        // file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F8</i>' + __('file.manager.filter.by'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    */
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F9</i>' + __('file.manager.search.by'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F10</i>' + __('file.manager.mic'));
    /*
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
     */
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    //cut
    //copy
    //paste
    //--------------------
    //download file raw / folder (folder as zip archive)
    //download file as zip archive
    //upload dialog
    //backup file / folder
    //--------------------
    //refresh folder
    //sort by
    //filter by
    //search
    create_div.appendChild(ul);
    section.appendChild(create_div);
    let ctx_calculate = create_div.calculate('all');
    if(ctx_calculate?.top + ctx_calculate?.height > (ctx_calculate?.window.height)){
        let body_calculate = section.select('.body')?.calculate('all');
        if(body_calculate){
            create_div.style.top = (body_calculate.window.height - body_calculate.bottom - ctx_calculate.height) + 'px';
        }
    }
    let close = create_div.select('.header .icon');
    if(close){
        close.on('click', (event) => {
            create_div.remove();
        });
    }
}

file.context_menu_item = ({
    event,
    node,
    section,
    tr,
    li
}) => {
    let dialog = section.select('.dialog');
    let ctx_menu = section.select('.context-menu');
    console.log(ctx_menu.style.zIndex);


    /*
    let create_div = section.select('.context-menu-item');
    if(!create_div){
        create_div = create('div');
        create_div.addClass('context-menu-item');
    } else {
    }
    let calculate = tr.calculate('all');
    create_div.style.top = calculate.top + 'px';
    create_div.style.left = calculate.left + 'px';
    // create_div.style.top = event.clientY + 'px';
    // create_div.style.left = event.clientX + 'px';
    create_div.style.zIndex = parseInt(dialog.style.zIndex) + 1;
    let ul = create_div.select('ul');
    if(!ul){
        ul = create('ul');
    } else {
        ul.html('');
    }
    let li = create('li', 'header');
    li.html('<h3><i class="keyboard-shortcut">esc</i> Context-menu <i class="icon fas fa-window-close"></i></h3>')
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">enter</i>' + __('file.manager.open'));
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-x</i>' + __('file.manager.cut'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-c</i>' + __('file.manager.copy'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-v</i>' + __('file.manager.paste'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">del</i>' + __('file.manager.delete'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    ul.appendChild(li);
    li = create('li', 'divider');
    li.html('');
    ul.appendChild(li);

    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F1</i>' + __('file.manager.download.raw'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F2</i>' + __('file.manager.download.zip'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F3</i>' + __('file.manager.upload.panel'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F4</i>' + __('file.manager.backup'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F5</i>' + __('file.manager.restore'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li', 'divider');
    li.html('');
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F6</i>' + __('file.manager.refresh.file.list'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F7</i>' + __('file.manager.sort.by') + '->');
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    li.on('click', (event) => {
        //context-menu-item
        file.context_menu_item({
            'event' : event,
            'node' : node,
            'section' : section,
            'tr' : tr,
            'li' : li
        });
        // file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F8</i>' + __('file.manager.filter.by'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F9</i>' + __('file.manager.search.by'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    li = create('li');
    li.html('<i class="icon far fa-file"></i><i class="keyboard-shortcut">ctrl-F10</i>' + __('file.manager.mic'));
    li.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    li.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.select('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
    ul.appendChild(li);
    //cut
    //copy
    //paste
    //--------------------
    //download file raw / folder (folder as zip archive)
    //download file as zip archive
    //upload dialog
    //backup file / folder
    //--------------------
    //refresh folder
    //sort by
    //filter by
    //search
    create_div.appendChild(ul);
    section.appendChild(create_div);
    let ctx_calculate = create_div.calculate('all');
    if(ctx_calculate?.top + ctx_calculate?.height > (ctx_calculate?.window.height)){
        let body_calculate = section.select('.body')?.calculate('all');
        if(body_calculate){
            create_div.style.top = (body_calculate.window.height - body_calculate.bottom - ctx_calculate.height) + 'px';
        }
    }
    let close = create_div.select('.header .icon');
    if(close){
        close.on('click', (event) => {
            create_div.remove();
        });
    }
     */
}

file.list = (response) => {
    const section = getSectionById(file.data.get('section.id'));
    console.log(file.data.get('section.id'));
    console.log(section);
    console.log(response);
    if(!section){
        return;
    }
    let create_table = create('table');
    let thead = create('thead');
    let th = create('tr');
    let tbody = create('tbody');
    let totalBytes = 0;
    let totalItems = 0;
    thead = file.header(thead, th);
    create_table.appendChild(thead);
    if(is.array(response.nodeList)){
        let files = [];
        for(let index in response.nodeList){
            files.push(response.nodeList[index]);
        }
        response.files = files;
    }
    if(is.array(response.files)){
        console.log(response.files);
        let index;
        totalItems = response.files.length;
        for(index=0; index < response.files.length; index++){
            let node = response.files[index];
            let tr = create('tr');
            let td = create('td', 'icon');
            if(node.type.toLowerCase() === 'dir'){
                td.html('<i class="far fa-folder"></i>');
                tr.data('dir', node.url);
            } else {
                td.html('<i class="far fa-file"></i>');
                td.on('click', (event) => {
                    //load context menu...
                    file.context_menu({
                        'event' : event,
                        'node' : node,
                        'section' : section,
                        'tr' : tr,
                    });
                });
                tr.data('file', node.url);
                tr.data('extension', node.extension);
                totalBytes+=node.size;
            }
            tr.appendChild(td);
            td = create('td');
            td.html(node.name);
            tr.appendChild(td);
            td = create('td');
            td.html(date('Y-m-d H:i', node.mtime));
            tr.appendChild(td);
            td = create('td');
            td.html(node.extension);
            tr.appendChild(td);
            td = create('td');
            td.html(file.size(node.size));
            tr.appendChild(td);
            tr.on('click', (event) => {
                file.open(event);
            });
            tbody.appendChild(tr);
        }
    }
    create_table.appendChild(tbody);
    const list = section.select('.list');
    if(list){
        list.html('');
        list.appendChild(create_table, list.firstChild);
    }
    const footer = section.select('.footer');
    if(footer){
        const item = footer.select('.item');
        if(item){
            if(totalItems === 1){
                item.html(totalItems + ' ' + __('file.manager.item'));
            } else {
                item.html(totalItems + ' ' + __('file.manager.items'));
            }

        }
        const size = footer.select('.size');
        if(size){
            size.html(file.size(totalBytes));
        }
    }
    table.resize(section.select('.list table'), '2px solid rgba(255, 124, 13, 1)', true);
    const refresh = section.select('.refresh');
    if(!refresh){
        return;
    }
    refresh.removeClass('fa-spin');
}

file.open = (event) => {
    const section = getSectionById(file.data.get('section.id'));
    if(!section){
        return;
    }
    if (event.detail === 1) {
        const list = section.select('.list tr');
        const element = event.target.closest('tr');
        if (
            list &&
            element
        ) {
            list.removeClass('selected');
            element.addClass('selected');
        }
    } else {
        const element = event.target.closest('tr');
        const address = section.select('input[name="address"]');
        if(
            element &&
            element.data('file')
        ){
            file.open_file_with(element);
        }
        else if (
            element &&
            element.data('dir') &&
            address
        ){
            address.data('dir', element.data('dir'));
            address.value = element.data('dir');
            address.trigger('change');
        }
    }
}

file.open_file_with = (element) => {
    const route = {
        extension : file.data.get('route.backend.extension'),
        frontend : file.data.get('route.frontend.application')
    };
    let node = {
        "name" : element.data('extension'),
        "request" : {
            "method" : "GET"
        }
    };
    if(!node?.name){
        node.name = 'txt';
    }
    const token = user.token();
    header("Authorization", 'Bearer ' + token);
    request(route.extension, node, (url, data) => {
        if(exception.authorization(data)){
            user.authorization((url, response) => {
                if(exception.authorization(response)){
                    redirect(user.loginUrl());
                } else {
                    user.data('user', response?.node);
                    request(route.extension, node, (url, response) => {
                        if(response?.nodeList){
                            let index;
                            for(index = 0; index < response.nodeList.length; index++){
                                let node = response.nodeList[index];
                                if(node && is.array(node?.applications)){
                                    let data_send = {};
                                    data_send.file = element.data('file');
                                    data_send.nodeList = node.applications;
                                    request(route.frontend, data_send, (url, response) => {
                                        console.log(response);
                                    });
                                }
                            }
                        }
                    });
                }
            });
        } else {
            if(data?.nodeList){
                let index;
                for(index = 0; index < data.nodeList.length; index++){
                    let node = data.nodeList[index];
                    if(node && is.array(node?.applications)){
                        let data_send = {};
                        data_send.file = element.data('file');
                        data_send.nodeList = node.applications;
                        request(route.frontend, data_send, (url, response) => {
                            console.log(url);
                            console.log(response);
                        });
                    }
                }
            }
        }

    });
}

file.section_active = (id) => {
    let active = file.data.get('active');
    let index;
    for(index=0; index < active.length; index++){
        if(id === active[index]){
            file.data.set('section.id', id);
            return;
        }
    }
}

export { file }