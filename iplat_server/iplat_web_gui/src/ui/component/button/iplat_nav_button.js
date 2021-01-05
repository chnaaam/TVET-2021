import React, {useState} from 'react';
import './css/iplat_nav_button.css'

function IPlatNavButton(props){
    const ratata = props.Title

    function include_uri(name){
        const uri = props.Title.toLowerCase()

        console.log("ra -uri: ", uri, name);


        if(name[0] == uri[0]){
            console.log("true");
            return true
        }

        else if(name[0] == "n" && uri[0] == "h"){
            console.log("true");
            return true
        }
        else if(name[0] == "f" && uri[0] == "h"){
            console.log("true");
            return true
        }

        return false
    }

    return(
        <button className={include_uri(props.SelectNav) ? "nav-btn-on" : "nav-btn-off"}
                onKeyPress={props.OnkeyPress}>
            {props.Title}
        </button>
    )
}

export default IPlatNavButton;

// class Device():
//     name = "hello"
//     def get():
//         return name
//
//     def set(name):
//         self.name = name
//
// class Sensor():
//     name = "hello"
//     def get():
//         return name
//
//     def set(name):
//         self.name = name
//
// device = Device()
// device.get()
//
// sensor = Sensor()
// sensor.get()

// class DeviceManagement():
//     device = Device()
//     def get(idx):
//         return device[idx].get()
//
// class Device():
//     def get():
//         return name
//
// device_management = Devicemanagement()
// device_management.get(1)
