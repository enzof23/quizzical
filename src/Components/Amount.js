function Amount({ getAmount }) {
  return (
    <>
      <h3 className="category-header">Number of Questions</h3>
      <div className="categories-container">
        <button className="amount-btn" onClick={() => getAmount(5)}>
          5
        </button>
        <button className="amount-btn" onClick={() => getAmount(10)}>
          10
        </button>
        <button className="amount-btn" onClick={() => getAmount(20)}>
          20
        </button>
      </div>
    </>
  );
}

export default Amount;
