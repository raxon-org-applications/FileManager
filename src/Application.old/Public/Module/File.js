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
        size = round(size / (bytes * bytes * bytes * bytes), 2) + '&nbsp;' + __('file.manager.TB');
    }
    else if(size > bytes * bytes * bytes){
        size = round(size / (bytes * bytes * bytes), 2) + '&nbsp;' + __('file.manager.GB');
    }
    else if(size > bytes * bytes){
        size = round(size / (bytes * bytes), 2) + '&nbsp;' + __('file.manager.MB');
    }
    else if(size > bytes){
        size = round(size / bytes, 2) + '&nbsp;' + __('file.manager.KB');
    } else {
        size += '&nbsp;' + __('file.manager.B');
    }
    return size;
}

file.context_menu = ({
    event,
    node,
    section,
    tr
}) => {
    let is_active = file.data.get('context.menu.active');
    if(is_active){
        return;
    }
    file.data.set('context.menu.active', true);
    file.data.set('context.menu.time.active', microtime(true));
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
    let table = create('table');
    table.attribute('cellspacing', 0);
    table.attribute('cellpadding', 0);
    let tbody = create('tbody');
    let table_tr = create('tr', 'header');
    let th = create('th');
    th.html('<h3><i class="keyboard-shortcut">esc</i> Context-menu <i class="icon fas fa-window-close"></i></h3>');
    th.colSpan = 4;
    table_tr.appendChild(th);
    tbody.appendChild(table_tr);
    /**/

    /*
    let url = file.data.get('route.backend.context.menu');
    let token = user.token();
    //need api url
    //need file and content type
    let data = {
        'file' : tr.data('file'),
        'extension' : tr.data('extension')
    };
    header("Authorization", 'Bearer ' + token);
    request(url, data, (url, response) => {
        console.log(response);
    });
    console.log(url);
    console.log(data);
     */
    let index;
    for(index = 0; index < node?.contextMenu?.length; index++){
        let item = node.contextMenu[index];
        table_tr = create('tr');
        let td = create('td');
        let i = create('i');
        i.addClass(item?.icon?.class);
        i.on('mouseover', (event) => {
            let keyboard_shortcut = event.target.closest('.keyboard-shortcut');
            if(keyboard_shortcut){
                keyboard_shortcut.addClass('active');
            }
        });
        i.on('mouseout', (event) => {
            let keyboard_shortcut = event.target.closest('.keyboard-shortcut');
            if(keyboard_shortcut){
                keyboard_shortcut.removeClass('active');
            }
        });
        td.appendChild(i);
        // td.html('<i class="icon far fa-file"></i>');
        table_tr.appendChild(td);
        td = create('td');
        let keyboard_shortcut = !is.empty(item?.keyboard) ?  item.keyboard : '&nbsp;';
        td.html('<i class="keyboard-shortcut">' + keyboard_shortcut +'</i>');
        table_tr.appendChild(td);
        td = create('td');
        td.html(__(item.name));
        table_tr.appendChild(td);
        td = create('td');
        if(item?.submenu){
            let submenu = item?.submenu
            console.log(submenu);
            td.html('&#10219;');
            td.on('click', (event) => {
                file.context_menu_item({event, submenu, section, tr, td});
            });
        } else {
            td.html('');
        }
        table_tr.appendChild(td);
        tbody.appendChild(table_tr);
        table_tr.on('click', (event) => {
            file.open_file_with(tr);
        });
        table_tr.on('mouseover', (event) => {
            let keyboard_shortcut = event.target.closest('.keyboard-shortcut');
            if(keyboard_shortcut){
                keyboard_shortcut.addClass('active');
            }
        });
        table_tr.on('mouseout', (event) => {
            let keyboard_shortcut = event.target.closest('.keyboard-shortcut');
            if (keyboard_shortcut) {
                keyboard_shortcut.removeClass('active');
            }
        });
        tbody.appendChild(table_tr);
    }
    table_tr = create('tr');
    let td = create('td');
    let i = create('i');
    i.addClass('icon far fa-file');
    i.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.closest('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    i.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.closest('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    td.appendChild(i);
    // td.html('<i class="icon far fa-file"></i>');
    table_tr.appendChild(td);
    console.log(table_tr);

    td = create('td');
    td.html('<i class="keyboard-shortcut">enter</i>');
    table_tr.appendChild(td);
    td = create('td');
    td.html(__('file.manager.open'));
    table_tr.appendChild(td);
    td = create('td');
    td.html('&#10219;');
    let submenu = node?.submenu;
    td.on('click', (event) => {
        file.context_menu_item({event, submenu, section, tr, td});
    });
    table_tr.appendChild(td);
    tbody.appendChild(table_tr);
    table_tr.on('click', (event) => {
        file.open_file_with(tr);
    });
    table_tr.on('mouseover', (event) => {
        let keyboard_shortcut = event.target.closest('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.addClass('active');
        }
    });
    table_tr.on('mouseout', (event) => {
        let keyboard_shortcut = event.target.closest('.keyboard-shortcut');
        if(keyboard_shortcut){
            keyboard_shortcut.removeClass('active');
        }
    });
    table.appendChild(tbody);
    /*
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
     */
    /*
    li.on('click', (event) => {
        file.open_file_with(tr);
    });
     */
    // ul.appendChild(li);
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
    create_div.appendChild(table);
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
            file.data.delete('context.menu.active');
            create_div.remove();
        });
    }
}

file.context_menu_item = ({
    event,
    submenu,
    section,
    tr,
    td
}) => {
    let is_active = file.data.get('context.menu.item.active');
    if(is_active){
        return;
    }
    file.data.set('context.menu.item.active', true);
    file.data.set('context.menu.time.item.active', microtime(true));
    let dialog = section.select('.dialog');
    let ctx_menu = section.select('.context-menu');
    console.log(ctx_menu.style.zIndex);
    console.log(event);
    console.log(submenu);
    console.log(section);
    console.log(tr);
    console.log(td);
    let td_calculation = td.calculate('all');
    console.log(td_calculation);
    event.preventDefault();
    event.stopPropagation();
    let create_div = section.select('.context-menu-item');
    if(!create_div){
        create_div = create('div');
        create_div.addClass('context-menu-item');
    } else {
    }
    create_div.style.top = td_calculation.top + 'px';
    create_div.style.left = td_calculation.left + 'px';
    create_div.style.zIndex = parseInt(ctx_menu.style.zIndex);
    let table = create_div.select('table');
    if(table){
        table.remove();
    }
    table = create('table');
    table.attribute('cellspacing', 0);
    table.attribute('cellpadding', 0);
    let tbody = create('tbody');
    let table_tr = create('tr', 'header');
    let table_td = create('td');
    table_td.html('&#10218;');
    table_td.on('click', (event) => {
        file.data.delete('context.menu.item.active');
        create_div.remove();
    });
    table_td.colSpan = 4;
    table_tr.appendChild(table_td);
    tbody.appendChild(table_tr);
    /**/
    if(submenu.length > 0){
        let index;
        for(index = 0; index < submenu.length; index++){
            let menu_item = submenu[index];
            table_tr = create('tr');
            table_td = create('td');
            let i = create('i');
            i.addClass(menu_item?.icon?.class);
            i.on('mouseover', (event) => {
                let keyboard_shortcut = event.target.closest('.keyboard-shortcut');
                if(keyboard_shortcut){
                    keyboard_shortcut.addClass('active');
                }
            });
            i.on('mouseout', (event) => {
                let keyboard_shortcut = event.target.closest('.keyboard-shortcut');
                if(keyboard_shortcut){
                    keyboard_shortcut.removeClass('active');
                }
            });
            table_td.appendChild(i);
            table_tr.appendChild(table_td);
            table_td = create('td');
            let keyboard_shortcut = !is.empty(menu_item?.keyboard) ?  menu_item.keyboard : '&nbsp;';
            table_td.html('<i class="keyboard-shortcut">' + keyboard_shortcut +'</i>');
            table_tr.appendChild(table_td);
            table_td = create('td');
            table_tr.appendChild(table_td);
            table_td.html(__(menu_item.name));
            table_tr.appendChild(table_td);
            table_td = create('td');
            if(submenu?.submenu){
                submenu = submenu?.submenu
                console.log(submenu);
                table_td.html('&#10219;');
                table_td.on('click', (event) => {
                    file.context_menu_item({event, submenu, section, tr, td});
                });
            } else {
                td.html('');
            }
            table_tr.appendChild(table_td);
            tbody.appendChild(table_tr);
            table_tr.on('click', (event) => {
                file.open_file_with(tr);
            });
            table_tr.on('mouseover', (event) => {
                let keyboard_shortcut = event.target.closest('.keyboard-shortcut');
                console.log(keyboard_shortcut);
                if(keyboard_shortcut){
                    keyboard_shortcut.addClass('active');
                }
            });
            table_tr.on('mouseout', (event) => {
                let keyboard_shortcut = event.target.closest('.keyboard-shortcut');
                if(keyboard_shortcut){
                    keyboard_shortcut.removeClass('active');
                }
            });
        }
    }
    table.appendChild(tbody);
    create_div.appendChild(table);
    section.appendChild(create_div);
}

file.list = (config, response) => {
    const section = getSectionById(file.data.get('section.id'));
    console.log(file.data.get('section.id'));
    console.log(section);
    console.log(response);
    if(!section){
        return;
    }
    console.log(config);
    console.log(response)
    let column = 0;
    let totalBytes = 0;
    let totalItems = response.nodeList.length;
    let create_ul = create('ul');
    let li = create('li');
    li.addClass('header icon');
    li.html(__('file.manager.icon'));
    create_ul.appendChild(li);
    column++;
    li = create('li');
    li.addClass('header name');
    li.html(__('file.manager.name'));
    create_ul.appendChild(li);
    column++;
    li = create('li');
    li.addClass('header modified');
    li.html(__('file.manager.modified'));
    create_ul.appendChild(li);
    column++;
    li = create('li');
    li.addClass('header type');
    li.html(__('file.manager.type'));
    create_ul.appendChild(li);
    column++;
    li = create('li');
    li.addClass('header size');
    li.html(__('file.manager.size'));
    create_ul.appendChild(li);
    column++;
    let index;
    for(index = 0; index < response.nodeList.length; index++){
        let node = response.nodeList[index];
        if(node.type.toLowerCase() === 'dir'){
            li = create('li');
            li.addClass('icon');
            li.html('<i class="far fa-folder"></i>');
            li.data('dir', node.url);
            create_ul.appendChild(li);
            li = create('li');
            li.data('dir', node.url);
            li.addClass('name');
            li.html(node.name);
            li.on('click', (event) => {
                file.open(event);
            });
            create_ul.appendChild(li);
            li = create('li');
            li.data('dir', node.url);
            li.addClass('modified');
            li.html(date('Y-m-d H:i', node.mtime));
            li.on('click', (event) => {
                file.open(event);
            });
            create_ul.appendChild(li);
            li = create('li');
            li.data('dir', node.url);
            li.addClass('type');
            if(node.type.toLowerCase() === 'dir'){
                li.html(__('file.manager.dir'));
            } else {
                li.html(node.extension);
            }
            li.on('click', (event) => {
                file.open(event);
            });
            create_ul.appendChild(li);
            li = create('li');
            li.data('dir', node.url);
            li.addClass('size');
            li.html(file.size(node.size));
            li.on('click', (event) => {
                file.open(event);
            });
            create_ul.appendChild(li);
        } else {
            li = create('li');
            li.addClass('icon');
            li.html('<i class="far fa-file"></i>');
            li.on('click', (event) => {
                //load context menu...
                file.context_menu({
                    'event' : event,
                    'node' : node,
                    'section' : section,
                    'tr' : li,
                });
            });
            li.data('file', node.url);
            li.data('extension', node.extension);
            create_ul.appendChild(li);
            li = create('li');
            li.data('file', node.url);
            li.data('extension', node.extension);
            li.addClass('name');
            li.html(node.name);
            li.on('click', (event) => {
                file.open(event);
            });
            create_ul.appendChild(li);
            li = create('li');
            li.data('file', node.url);
            li.data('extension', node.extension);
            li.addClass('modified');
            li.html(date('Y-m-d H:i', node.mtime));
            li.on('click', (event) => {
                file.open(event);
            });
            create_ul.appendChild(li);
            li = create('li');
            li.data('file', node.url);
            li.data('extension', node.extension);
            li.addClass('type');
            if(node.type.toLowerCase() === 'dir'){
                li.html(__('file.manager.dir'));
            } else {
                li.html(node.extension);
            }
            li.on('click', (event) => {
                file.open(event);
            });
            create_ul.appendChild(li);
            li = create('li');
            li.data('file', node.url);
            li.data('extension', node.extension);
            li.addClass('size');
            li.html(file.size(node.size));
            li.on('click', (event) => {
                file.open(event);
            });
            create_ul.appendChild(li);
        }
        totalBytes+=node.size;
    }
    const list = section.select('.list');
    if(list){
        list.html('');
        list.appendChild(create_ul, list.firstChild);
        file.calculate_list(list, column);
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
    // create_ul.addClass('tree');
    /*
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
                4
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
     */
    const refresh = section.select('.refresh');
    if(!refresh){
        return;
    }
    refresh.removeClass('fa-spin');
}

file.calculate_list = (list, column) => {
    let total_width = list.computedStyle('width');
    if(total_width.split('px').length > 1){
        total_width = parseFloat(total_width.split('px')[0]);
    }
    let li = list.select('li');
    let index = 0;
    let row_number = 0;
    let table = [];
    let height = 0;
    for(index=0; index < li.length; index++){
        let width = li[index].computedStyle('width');
        if(width.split('px').length > 1){
            width = parseFloat(width.split('px')[0]);
        }
        let padding_left = li[index].computedStyle('padding-left');
        if(padding_left.split('px').length > 1){
            padding_left = parseFloat(padding_left.split('px')[0]);
        }
        let padding_right = li[index].computedStyle('padding-right');
        if(padding_right.split('px').length > 1){
            padding_right = parseFloat(padding_right.split('px')[0]);
        }
        let margin_left = li[index].computedStyle('margin-left');
        if(margin_left.split('px').length > 1){
            margin_left = parseFloat(margin_left.split('px')[0]);
        }
        let margin_right = li[index].computedStyle('margin-right');
        if(margin_right.split('px').length > 1){
            margin_right = parseFloat(margin_right.split('px')[0]);
        }
        if(index > 0 && index % column === 0){
            row_number++;
            let li_height = li[index].computedStyle('height');
            if(li_height.split('px').length > 1){
                li_height = parseFloat(li_height.split('px')[0]);
            }
            height += li_height;
        }
        let column_number = index % column;
        if(!table[row_number]){
            table[row_number] = [];
        }
        table[row_number][column_number] = {
            'width': width,
            'padding': {
                'left': padding_left,
                'right': padding_right
            },
            'margin': {
                'left': margin_left,
                'right': margin_right
            },
            'width_total': width + padding_left + padding_right + margin_left + margin_right
        };
        // totalWidth -= width;
    }
    let max_width_column = [];
    let max_width_column_total = [];
    let row;
    for(index = 0; index < table.length; index++){
        row = table[index];
        let totalWidthRow = 0;
        let column_nr;
        for(column_nr = 0; column_nr < row.length; column_nr++){
            if(!max_width_column[column_nr]){
                max_width_column[column_nr] = row[column_nr].width;
                max_width_column_total[column_nr] = row[column_nr].width_total;
            }
            else if (row[column_nr].width_total > max_width_column[column_nr]){
                max_width_column[column_nr] = row[column_nr].width;
                max_width_column_total[column_nr] = row[column_nr].width_total;
            }
        }
    }
    let column_biggest_width;
    let column_biggest_index;
    let max_width_column_size = 0;
    for(index = 0; index < max_width_column.length; index++){
        if(!column_biggest_width){
            column_biggest_width = max_width_column[index];
            column_biggest_index = index;
        }
        else if (max_width_column[index] > column_biggest_width){
            column_biggest_width = max_width_column[index];
            column_biggest_index = index;
        }
        max_width_column_size += max_width_column_total[index];
    }
    if(max_width_column_size > total_width){
        total_width = max_width_column_size;
        list.select('ul').css('min-width', max_width_column_size + 'px');
    } else {
        list.select('ul').css('min-width', total_width + 'px');
    }
    for(index = 0; index < li.length; index++) {
        let column_index = index % column;
        if (column_index === column_biggest_index) {
            let j;
            let max_width = total_width;
            for (j = 0; j < max_width_column.length; j++) {
                if (j === column_biggest_index) {
                    max_width -= (max_width_column_total[j] - max_width_column[j]);
                    continue;
                }
                max_width -= max_width_column_total[j];
            }
            li[index].css('width', max_width + 'px');

        } else {
            li[index].css('width', max_width_column[column_index] + 'px');
        }
    }
    list.select('ul').css('min-height', height + 'px');
}

file.open = (event) => {
    const section = getSectionById(file.data.get('section.id'));
    if(!section){
        return;
    }
    if (event.detail === 1) {
        const list = section.select('.list li');
        const element = event.target.closest('li');
        if (
            list &&
            element
        ) {
            list.removeClass('selected');
            element.addClass('selected');
            let index;
            for(index = 0; index < list.length; index++){
                if(element === list[index]){
                    let j;
                    for(j = index; j >= 0; j--){
                        list[j].addClass('selected');
                        if(list[j].hasClass('icon')){
                            break;
                        }
                    }
                    for(j = index; j < list.length; j++){
                        list[j].addClass('selected');
                        if(list[j].hasClass('size')){
                            break;
                        }
                    }
                    break;
                }
            }
        }
    } else {
        const element = event.target.closest('li');
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