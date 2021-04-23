import React from 'react';

import './data-use-page.styles.scss';

const DataUse = () => {
  return (
    <div className="data-page container">
      <h1>Your Data</h1>

      <h2>What I'm gathering</h2>
      <p>
        I literally only get what you type in your Budget Tracker. I don't care
        about the rest, I don't even care about what you type in.
      </p>

      <h2>Do I use your data ?</h2>
      <p>
        No. I don't do anything with it, as said above, I don't care about it.
        There's no password, no personal data apart from your monthly income and
        the name/amount of your debts/savings/budget categories. All the
        information is based on what you type, I don't know, nor care if the
        data is accurate or not.
      </p>
      <p>
        I'm not selling your data, nor do I intend to. This just started as a
        training project for myself based on The Meaningful Money Handbook. I'm
        not planning to make it my main source of income, the most I'll do is
        look at Amazon Associates and see if I can get a few pence a month from
        it to buy 1/32th of a beer.
      </p>
      <p>I only access the data for support purposes ( lost your URL... )</p>
    </div>
  );
};

export default DataUse;
