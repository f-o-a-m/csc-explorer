import React from 'react'

const WelcomeModal = (props) => {
  return (
    <div className="welcome-modal-wrapper">
      <div className="welcome-modal">
        <div className="top">
          <h1>Welcome to the Spatial Index</h1>
          <p>The Spatial Index is a visual explorer for smart contracts and geospatial applications on blockchain. We think of it as a cross between a Bloomberg trading terminal and Google Maps. As an open-source web-app, built with our purescript-web3 library, it will be used to a) allow users to interact with our protocol visually and b) as cornerstone in the large variety of decentralized applications that can be built on top of our protocols.</p>
          <p>When you are ready to begin... lorem ipsum dolar</p>
          <button className={'button-card'}>{'Authenticate'}</button>
        </div>
        <div className="bottom">
          <div className="welcome-modal-column">
              <img className="icon" src="/icons/icon-1.png"/>
            <h2>The Map</h2>
            <h3>Controlling the Map</h3>
            <p>By using the mouse you can pan, zoom and rotate the map in 3D.</p>
            <p>Layers can be turned on or off with the layer control menu in the lower right-hand side of the app. Some layers only appear at certain zoom levels.</p>
            <h3>Items On The Map</h3>
            <p>There are a few elements you can see on the map.</p>
            <p><b>Beacons</b></p>
            <p>Beacons are like local GPS satellites. They form zones which are used to locate a user.</p>
            <p><b>Bots</b></p>
            <p>In lieu of physical infrastructure, this app simulates car movement with Uber data.</p>
            <p><b>Triangulations</b></p>
            <p>The zones of coverage offered by Beacons are visualized as triangulations, with Arcs tracking the location of Bots as they move by.</p>
          </div>
          <div className="welcome-modal-column">
              <img className="icon" src="/icons/icon-2.png"/>
            <h2>Placing a CSC</h2>
            <p>You can place a crypto-spatial coordinate on the map. It’s coordinates are then added to the blockchain with the FOAM protocol. To do so, you will need Metamask installed in your browser.</p>
            <ol>
              <li>Click on the map at the location where you’d like to place a CSC.</li>
              <li>Fill out the ‘Create A CSC’ form on the lefthand side of the viewport.</li>
              <li>Press Submit</li>
              <li>Metamask should open. Ensure that you are on the Ropsten Test Net. </li>
              <li>Add extra gas to ensure timely transaction. 20-50 gwei is recommended.</li>
              <li>Press submit in Metamask.</li>
              <li>Go to the ‘SENT’ tab in Metamask and press the ‘…’ button to see your transaction progress on Etherscan.</li>
              <li>Type name of your beacon in the search and click on the popup card to see the dashboard.</li>
              <li>Close the dashboard and the map will zoom onto your beacon location.</li>
            </ol>
          </div>
          <div className="welcome-modal-column">
              <img className="icon" src="/icons/icon-3.png"/>
              <h2>Aquiring FOAM Tokens</h2>
              <p>You can use Metamask to add testnet FOAM tokens to a Metamask wallet. To do so: </p>
              <ol>
                <li>Click ‘Aquire FOAM Tokens’ in the top right-hand corner of the app viewport. This will open Metamask.</li>
                <li>Add extra gas to ensure timely transaction. 20-50 gwei is recommended.</li>
                <li>Press Submit. The quantity of testnet FOAM tokens per transaction is predefined.</li>
                <li>The balance in the top right corner should change.</li>
              </ol>
          </div>
        </div>
      </div>
    </div>
  )
}


export default WelcomeModal
