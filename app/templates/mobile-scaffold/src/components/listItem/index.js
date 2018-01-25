import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        const { data } = this.props;
        return (
            <ul className="book">
                {data.map((item, index) => (
                    <li key={index} className="book-list"><Link to={`/itemanalysis/${item.id}/${item.name}`}>{item.name}</Link></li>
                ))}
            </ul>
        )
    }
}