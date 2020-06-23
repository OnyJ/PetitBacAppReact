import React, { useEffect, useState } from "react";
import actionCable from 'actioncable';
import { ActionCableProvider, ActionCable } from 'react-actioncable-provider';


const Demo = () => {
  const [channel, setChannel] = useState(null);
  //const [test, setTest] = useState("rien");
  const [data, setData] = useState("kedal");
  const [stop, setStop] = useState(false);
  const cable = actionCable.createConsumer('ws://localhost:8080/cable');
  
  useEffect(() => {
        const sub = cable.subscriptions.create({ channel :'DemoChannel', id: 1, toutetnimporte: true},{
            initialized() {
              setChannel(this)
            }
            
          }) 
      }, []);
  
  
  /*useEffect(() => {
    
    if (stop) {
      
      alert("STOP !")
    }
      
  }, [stop]);*/
  
  const handleReceived = (stop) => {
              console.log("test", stop)
  }

  return (
    <>
    
    <ActionCableProvider cable={cable} >
      <ActionCable
            channel={{ channel: 'DemoChannel'}}
            onReceived={handleReceived}
          />
      <input value={data} onChange={(e) => setData(e.target.value)}/>
      <button onClick={() => channel.send({stop: stop, body: data})} >Send channel </button>
      
    </ActionCableProvider>
    
    </>
  );
};

export default Demo;