import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON, Marker, Popup, LayersControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import img from '../ico/icoMark64.png'
import { regions } from '../GeoJSON/Regions'
import { markers } from '../GeoJSON/Markers'

let myIcon = L.icon({
    iconUrl: img,
    iconSize: [32, 32], //tamaño del marcador
    iconAnchor: [16, 32], //coordenadas del marcador 
    popupAnchor: [0, -32] //coordenadas de la ventana emeergente
})

export default class MapReact extends Component {

    state = {
        markers: null,
        position: [49, 30],
        zoom: 6,
        url: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',

        url2: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
    }

    componentDidMount() {
        this.setState({
            markers: markers
        })
    }

    render() {
        const { position, url, zoom, url2, markers } = this.state


        return (
            <Map className='map' center={position} zoom={zoom}>

                <TileLayer
                    url={url2}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                    <GeoJSON

                    data={regions}

                    style={(feature) => {
                        return {
                            // stroke: true,
                            color: '#335fff',
                            fill: true,
                            opacity: 0.1
                        }
                    }}

                    onEachFeature={(feature, layer) => {

                        layer.on('mouseover', function () {
                            layer.bindTooltip(feature.properties['name:en']).openTooltip()
                            this.setStyle({
                                fillColor: '#FF335F'
                            })

                        })

                        layer.on('mouseout', function () {

                            this.setStyle({
                                'fillColor': '#335fff'
                            });
                        });

                        layer.on('click', function () {
                            console.log(feature.properties['name:en'])
                        })

                    }} />

                {/* <LayersControl position='topright'>

                    <LayersControl.BaseLayer name='Normal'>
                        <TileLayer
                            url={url2}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name='Dark'>
                        <TileLayer
                            url={url}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name='Division'>

                        <GeoJSON

                            data={regions}

                            style={(feature) => {
                                return {
                                    // stroke: true,
                                    color: '#335fff',
                                    fill: true,
                                    opacity: 0.1
                                }
                            }}

                            onEachFeature={(feature, layer) => {

                                layer.on('mouseover', function () {
                                    layer.bindTooltip(feature.properties['name:en']).openTooltip()
                                    this.setStyle({
                                        fillColor: '#FF335F'
                                    })

                                })

                                layer.on('mouseout', function () {

                                    this.setStyle({
                                        'fillColor': '#335fff'
                                    });
                                });

                                layer.on('click', function () {
                                    console.log(feature.properties['name:en'])
                                })

                            }} />
                    </LayersControl.BaseLayer>

                </LayersControl> */}

                {markers !== null ?

                    markers.features.map((x, i) => (
                        <Marker
                            position={
                                [x.geometry.coordinates[1],
                                x.geometry.coordinates[0]]
                            }
                            icon={myIcon}
                            key={i}>
                            <Popup>
                                Заголовок: {x.properties.header}
                                <br />
                                Число: {x.properties.text}
                            </Popup>
                        </Marker>
                    )) : null
                }

            </Map>)
    }
}

