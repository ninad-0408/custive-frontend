import React, { useEffect, useState } from 'react';
import { delQuote, getQuotes } from '../Api';
import { Link } from 'react-router-dom';

interface ICardProps {
    _id: string;
    deleteQuote: Function;
    quoteName: string;
    totalAmount: number;
    validityDate: Date;
};

interface IQuote {
    _id: string;
    name: string;
    totalAmount: number;
    validityDate: Date;
}

const Card = (props: ICardProps) => {
    return (
        <div className="card" style={{ minWidth: "200px" }}>
            <div className="card-body">
                <div className="card-title">
                    <Link to={`/edit-quote/${props._id}`}>
                        <span className='fs-4'>{props.quoteName}</span>{"  "}
                    </Link>
                    <span className="btn btn-sm btn-primary">
                        {new Date(props.validityDate).getTime() < new Date().getTime() ? "Expired" : "Valid"}
                    </span>
                </div>
                <span className="card-text">Total Amount: {props.totalAmount}</span>{"  "}
                <span className="btn btn-sm btn-danger" onClick={() => props.deleteQuote(props._id)}>Delete</span>
            </div>
        </div>
    )
};

export default function Quotes() {

    const [quotes, setQuotes] = useState<IQuote[]>([])

    useEffect(() => {
        getQuotes()
            .then((data) => setQuotes(data))
            .catch((err) => console.log(err))
    }, [])

    const deleteQuote = (quoteId: string) => {
        delQuote(quoteId)
            .then((data) => setQuotes(prevQuotes => prevQuotes.filter(quote => quote._id !== quoteId)))
            .catch((err) => console.log(err))
    }

    return (
        <div className="container">
            <div className="row">
                <div className="mt-4 mb-4 col-md-8">
                    <h1>Quotes</h1>
                </div>
                <div className="mt-4 mb-4 col-md-4">
                    <Link to='/create'>
                        <button className="btn btn-warning">Add</button>
                    </Link>
                </div>
            </div>
            <div className="container d-flex flex-column align-items-center">
                <div className="d-flex flex-wrap justify-content-sm-around">
                    {quotes.map((quote) => <Card key={quote._id} _id={quote._id} quoteName={quote.name} totalAmount={quote.totalAmount} validityDate={quote.validityDate} deleteQuote={deleteQuote} />)}
                </div>
            </div>
        </div>
    );
}
