import React from 'react';

const Header = () => {
  const styles = {
    flex: 1,
    backgroundColor: "#ccc",
    textAlign: "center",
    padding: "20px 0",
  }
  
  return (
    <div style={styles}>
      <h3>100 facts about cats</h3>
      <p>provided by users of https://cat-fact.herokuapp.com/ </p>
    </div>
  );
}

export default Header;