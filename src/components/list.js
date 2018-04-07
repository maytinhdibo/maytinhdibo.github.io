import React, { Component } from 'react';

class ListItem extends Component {
    removeItem = (e) => {
        this.props.removeItem(e.target.parentElement.id);
    }
    doneItem = (e) => {
        if (e.target.tagName == "BUTTON") return false;
        if (e.target.tagName != "LI") {
            e.target = e.target.parentElement;
        }
        this.props.doneItem(e.target.id);
    }
    render() {
        return <li onClick={this.doneItem} id={this.props.id} className={this.props.status == false ? "none" : "done"}><span>{this.props.title}</span><button onClick={this.removeItem} className="remove">&#x2715;</button></li>;
    }
}
class List extends Component {
    removeItem = (item) => {
        this.props.removeItem(item);
    }
    doneItem = (item) => {
        this.props.doneItem(item);
    }
    render() {
        const empty = <div id="empty"><br /><img alt="empty icon" src="/img/empty.png" /><span>This list is empty!</span></div>;
        var data = this.props.data.map((dataitem, index) => {
            return <ListItem removeItem={this.removeItem} doneItem={this.doneItem} status={dataitem.completed} title={dataitem.title} id={dataitem._id} />
        })
        return (
            <div id="list">
                {data}
                {data.length==0?empty:""}

            </div>
        )
    }
}
export default List;