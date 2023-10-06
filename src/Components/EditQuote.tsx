import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuote, postQuote, updateQuote } from '../Api';

export interface IEditQuoteProps {
}

export default function EditQuote(props: IEditQuoteProps) {
    const [quoteName, setQuoteName] = useState('');
    const [validityDate, setValidityDate] = useState('');
    const [totalAmount, setTotalAmount] = useState('0');

    const { quoteId } = useParams()

    useEffect(() => {
        if(quoteId)
        {
            getQuote(quoteId)
            .then((data) => {
                setQuoteName(data.name);
                setValidityDate(data.validityDate);
                setTotalAmount(data.totalAmount);
            })
            .catch((err) => console.log(err))
        }
        else
        {
            setQuoteName('');
            setValidityDate('');
            setTotalAmount('0');
        }
    }, [quoteId])

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        if(quoteId)
        {
            updateQuote(quoteId, {name: quoteName, validityDate: validityDate, totalAmount: totalAmount, fileNames: []})
                        .then((data) => {
                setQuoteName(data.name);
                setValidityDate(data.validityDate);
                setTotalAmount(data.totalAmount);
            })
            .catch((err) => console.log(err))
        }
        else
        {
            postQuote({name: quoteName, validityDate: validityDate, totalAmount: totalAmount, fileNames: []})
            .then((data) => {
                setQuoteName(data.name);
                setValidityDate(data.validityDate);
                setTotalAmount(data.totalAmount);
            })
            .catch((err) => console.log(err))
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Quote</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSave}>
                        <div className="mt-2 row form-group">
                            <div className="col-md-4">
                                <label htmlFor="quoteName">Quote Name</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="quoteName"
                                    value={quoteName}
                                    onChange={(e) => setQuoteName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-2 row form-group">
                            <div className="col-md-4">
                                <label htmlFor="validityDate">Validity Date</label>
                            </div>
                            <div className="col-md-8">

                                <input
                                    type="date"
                                    className="form-control"
                                    id="validityDate"
                                    value={validityDate}
                                    onChange={(e) => setValidityDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-2 row form-group">
                            <div className="col-md-4">
                                <label htmlFor="totalAmount">Total Amount</label>
                            </div>
                            <div className="col-md-8">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Rs.</span>
                                    </div>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="totalAmount"
                                        value={totalAmount}
                                        onChange={(e) => setTotalAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
