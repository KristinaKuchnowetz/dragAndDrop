import React from 'react';

const Footer = () => {

  let date = new Date();
  let year = date.getFullYear();

  const styles = {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#ccc",
    p: {
      margin: "10px 0"
    }
  }

  return (
    <div style={styles}>
      <p style={styles.p}>Made in {year}</p>
    </div>
  );
}

export default Footer;