const FixedSearch = () => {
  const toggleSearch = () => {
    document.querySelector(".search-icon").classList.toggle("active");
    document.querySelector(".search-area").classList.toggle("search-on");
  };

  return (
    <div className="fixed-search">
      <div className="search-area">
        <div className="search-icon cursor-pointer" onClick={toggleSearch}>
          <span className="pe-7s-search serch-icon"></span>
          <span className="pe-7s-close close-icon"></span>
        </div>
        <div className="search-form">
          <form action="contact.php">
            <div className="form-group">
              <input
                type="text"
                name="search"
                placeholder="Enter Your Keywords"
              />
              <button type="submit">
                <span className="pe-7s-search"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FixedSearch;
