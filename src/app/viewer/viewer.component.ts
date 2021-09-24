import {
  Component,
  OnInit,
  Renderer2,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { get } from 'scriptjs';
import * as $ from 'jquery';

declare var klokantech;
declare var ol;
declare var alphaColors;
declare var google;
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, AfterViewInit {
  map: google.maps.Map;
  @ViewChild('mapContainer') gmapElement: any;
  isCollapsed: boolean = false;
  isDownload: boolean = false;
  currentActiveMaptilerOverlay: any;
  sunwayOrthoOverlay: any;
  sunwayDSMOverlay: any;
  downloadPath: any =
    'https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/';
  mapLat = 18.5793;
  mapLng = 73.8143;
  mapZoom = 14;
  mapTypeId = google.maps.MapTypeId.ROADMAP;
  mapStyles: any = [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e9e9e9'
        },
        {
          lightness: 17
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5'
        },
        {
          lightness: 20
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 17
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 29
        },
        {
          weight: 0.2
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 18
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 16
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5'
        },
        {
          lightness: 21
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dedede'
        },
        {
          lightness: 21
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'on'
        },
        {
          color: '#ffffff'
        },
        {
          lightness: 16
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          saturation: 36
        },
        {
          color: '#333333'
        },
        {
          lightness: 40
        }
      ]
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f2f2f2'
        },
        {
          lightness: 19
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#fefefe'
        },
        {
          lightness: 20
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#fefefe'
        },
        {
          lightness: 17
        },
        {
          weight: 1.2
        }
      ]
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [
        {
          visibility: 'on'
        },
        {
          saturation: '60'
        },
        {
          weight: '2.32'
        },
        {
          color: '#71974c'
        }
      ]
    },
    {
      featureType: 'administrative.province',
      elementType: 'geometry.stroke',
      stylers: [
        {
          visibility: 'on'
        },
        {
          saturation: '100'
        },
        {
          gamma: '10.00'
        },
        {
          lightness: '-20'
        },
        {
          weight: '2.32'
        },
        {
          color: '#bbccab'
        }
      ]
    }
  ];
  constructor(private router: Router, private renderer: Renderer2, private activatedRoute: ActivatedRoute) {}

  currentSiteData:SiteData;
  
  siteDatas:SiteData[] = [
    { 
      orthoUrl: "https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/AL+HALA+FUJAIRAH/Processed/Maptiler/Hala-Orthomosaic/openlayers.html", 
      dsmUrl: "https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/AL+HALA+FUJAIRAH/Processed/Maptiler/Hala-DSM/openlayers.html", 
      contourUrl: "https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/AL+HALA+FUJAIRAH/Processed/Maptiler/Hala-Contour/openlayers.html",
      potreeUrl: "https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/AL+HALA+FUJAIRAH/Processed/Potree/AlHalaFujairah/index.html",
      id: 1, 
      location: "Al Hala Fujairah",
      lat: 25.500996,
      lng: 56.152768,
      area: "8.985 km",
      volumetric: "1.823 sq km",
      minElevation: "208.415 m",
      maxElevation: "593.284 m",
      dsmDownload:"AL+HALA+FUJAIRAH/DSM+Dataset/AlHalaFujairah_DSM.tif",
      tifDownload: "AL+HALA+FUJAIRAH/Orthomosaic+Dataset/AlHalaFujairah_Ortho.tif",
      lasDownload: "AL+HALA+FUJAIRAH/Point+Cloud+Dataset/AlHalaFujairah.las",
      dxfDownload: "AL+HALA+FUJAIRAH/Contour+Line+Dataset/AlHalaFujairah_Contour.zip"
    },
    { 
      orthoUrl: "https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/DELMA+ISLAND/Processed/Maptiler/DelmaIsland-Orthomosaic/Delma+Island/openlayers.html", 
      dsmUrl: "https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/DELMA+ISLAND/Processed/Maptiler/DelmaIsland-DSM/Delma+Island/openlayers.html", 
      contourUrl: "https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/DELMA+ISLAND/Processed/Maptiler/DelmaIsland-Contour/Delma+Island/openlayers.html",
      potreeUrl: "https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/DELMA+ISLAND/Processed/Potree/DelmaIsland/index.html",
      id: 2, 
      location: "Delma Island",
      lat: 24.518458,
      lng: 52.289941,
      area: "11.757 km",
      volumetric: "11.757 sq km",
      minElevation: "-1.562 m",
      maxElevation: "58.407 m",
      dsmDownload:"DELMA+ISLAND/DSM+Dataset/DelmaIsland_DSM.tif",
      tifDownload: "DELMA+ISLAND/Orthomosaic+Dataset/DelmaIsland_3cm_Ortho.tif",
      lasDownload: "DELMA+ISLAND/Point+Cloud+Dataset/DelmaIsland.las",
      dxfDownload: "DELMA+ISLAND/Contour+Line+Dataset/DelmaIsland_Contour.zip"
    }
  ];

  ngOnInit() {
    const siteID = this.activatedRoute.snapshot.paramMap.get("id");
    if (siteID) {
      console.log("SITEID: ", siteID);
      this.currentSiteData = this.siteDatas.filter(site => { return site.id == parseInt(siteID) })[0];
    }
  }
  ngAfterViewInit() {
    this.createMap();
    this.readMaptilerSource(
      this.currentSiteData.orthoUrl
    );
    // this.loadContour('https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/Processed/Maptiler/Hala-Contour/');
  }
  createMap(){
    const mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: this.mapStyles,
      streetViewControl: false,
      // disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
  activeTabs(event){
    const x = document.querySelectorAll('.btn-light');
    const body = document.body;
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('active');
    }
    event.target.closest('.btn-light').classList.add('active');
    body.classList.remove('is3d');
  }

  loadMesh(){
    document.getElementById('map').innerHTML = '';
    document.getElementById('map').innerHTML = '<iframe src="' + this.currentSiteData.potreeUrl + '" width="100%"  class="map"></iframe>';
  }
  addBody(){
    const body = document.body;
    body.classList.add('is3d');
  }

  download(){
    this.isDownload = !this.isDownload;
  }
  // Download file format
  downloadMyFile(type) {
    let filename;
    switch (type) {
      case "tif":
      filename = this.currentSiteData.tifDownload;
      break;

      case "dsm":
      filename = this.currentSiteData.dsmDownload;
      break;

      case "las":
      filename = this.currentSiteData.lasDownload;
      break;

      case "dxf":
      filename = this.currentSiteData.dxfDownload;
      break;
      
      default:
      filename = this.currentSiteData.dsmDownload;
      break;
    }
    const ext = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.downloadPath + filename);
    link.setAttribute('download', "file." + ext);
    document.body.appendChild(link);
    link.click();
    link.remove();
    this.isDownload = false;
  }

  // Rednder tiler view
  readMaptilerSource(url: string, forContour = false) {
    this.createMap();
    const proxyUrl = 'https://proxy.aerodyne.dev/';
    const toDataURL = url =>
      fetch(proxyUrl + url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Origin: 'http://localhost:4200'
        }
      }).then(response => response.text());

    toDataURL(url).then(htmlString => {
      const htmlStr: string = htmlString.replace(/(\r\n|\n|\r)/gm, '');

      const boundsStripStr1: string = 'transformExtent(';
      const boundsStripStr2: string = ", 'EPSG:4326";

      const processBound1 = htmlStr.substring(
        htmlStr.indexOf(boundsStripStr1),
        htmlStr.indexOf(boundsStripStr2)
      );
      const processBound2 = processBound1.split(boundsStripStr1).join('');

      const boundsArr = JSON.parse(processBound2);
      const boundsLat1 = boundsArr[1];
      const boundsLng1 = boundsArr[0];
      const boundsLat2 = boundsArr[3];
      const boundsLng2 = boundsArr[2];
      const boundsFinal = [boundsLat1, boundsLng1, boundsLat2, boundsLng2];

      const zoomStripStr1: string = 'zoom:';
      const zoomStripStr2: string = '  })});</script>';

      let processZoom1 = htmlStr.substring(
        htmlStr.indexOf(zoomStripStr1),
        htmlStr.indexOf(zoomStripStr2)
      );
      const processZoom2 = processZoom1.split(zoomStripStr1).join('');

      const strippedData = {
        bounds: boundsFinal,
        // center: centerFinal,
        zoom: parseInt(processZoom2)
      };

      console.log('stripped: ', strippedData);

      const imageUrls = url.split('openlayers.html').join('');
      if (!forContour) {
        this.loadOrtho(imageUrls, strippedData);
      } else {
        //this.loadContour();
      }
      
      // this.loadContour(imageUrls);
    });
  }

  // Rednder Ortho view
  loadOrtho(imageUrls, data) {

    const env = this;
    // const mapBounds = new google.maps.LatLngBounds(
    //   new google.maps.LatLng(25.483563, 56.137144),
    //   new google.maps.LatLng(25.510808, 56.173497)
    // );
    const mapBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(data.bounds[0], data.bounds[1]),
      new google.maps.LatLng(data.bounds[2], data.bounds[3])
    );
    const mapMinZoom = 13;
    const mapMaxZoom = 23;
    const maptiler = new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        const proj = this.map.getProjection();
        const z2 = Math.pow(2, zoom);
        const tileXSize = 256 / z2;
        const tileYSize = 256 / z2;
        const tileBounds = new google.maps.LatLngBounds(
          proj.fromPointToLatLng(
            new google.maps.Point(
              coord.x * tileXSize,
              (coord.y + 1) * tileYSize
            )
          ),
          proj.fromPointToLatLng(
            new google.maps.Point(
              (coord.x + 1) * tileXSize,
              coord.y * tileYSize
            )
          )
        );
        const x = coord.x >= 0 ? coord.x : z2 + coord.x;
        const y = coord.y;
        if ( mapBounds.intersects(tileBounds) && mapMinZoom <= zoom && zoom <= mapMaxZoom)
          return zoom + '/' + x + '/' + y + '.png';
        else return 'https://www.maptiler.com/img/none.png';
      },
      tileSize: new google.maps.Size(256, 256),
      name:
        'Rendered with MapTiler Desktop <https://www.maptiler.com/desktop/>',
      alt: 'Rendered with MapTiler Desktop',

      opacity: 1.0
    });

    const overlay = new klokantech.MapTilerMapType(
      this.map,
      function(x, y, z) {
        return (
          imageUrls +
          '{z}/{x}/{y}.png'
            .replace('{z}', z)
            .replace('{x}', x)
            .replace('{y}', y)
        );
      },
      mapBounds,
      mapMinZoom,
      mapMaxZoom
    );

    new klokantech.OpacityControl(this.map, overlay, 1);

    this.map.fitBounds(mapBounds);

    // const center = new google.maps.LatLng(data.center[0], data.center[1]);
    // this.map.setCenter(center);
    // this.map.setZoom(data.zoom + 1);
  }

  // load contour
  loadContour(){

    const imageUrls = this.currentSiteData.contourUrl.split('openlayers.html').join('');
    const proxyUrl = 'https://proxy.aerodyne.dev/';

    console.log("ORTHO URLS: ", imageUrls);

    document.getElementById('map').innerHTML = "";
    
    var map;
    var layer;

    if (window.location.protocol == 'file:' && window.location.search != '?skipalert=') alert('Please upload this directory to a web hosting or run a simple web server!');
    //var mapExtent = ol.proj.transformExtent([56.137429, 25.485594, 56.169708, 25.510579], 'EPSG:4326', 'EPSG:3857');
    var mapExtent;
    var mapMinZoom;
    var mapMaxZoom;

    if (this.currentSiteData.id == 1) {
      mapExtent = ol.proj.transformExtent([56.137429, 25.485594, 56.169708, 25.510579], 'EPSG:4326', 'EPSG:3857');
      mapMinZoom = 10;
      mapMaxZoom = 19;
    } else {
      mapExtent = ol.proj.transformExtent([52.280329, 24.503447, 52.304745, 24.538007], 'EPSG:4326', 'EPSG:3857');
      mapMinZoom = 11;
      mapMaxZoom = 18;
    }

    // Prepare style list
    var layerStyleMap = {}, layerStyleVisibility = {};
    var vlayers;
    if (this.currentSiteData.id == 1) {
      vlayers = [{"id":"Hala_Contour_1m","description":"","minzoom":10, "maxzoom":19,"fields":{"NAME":"String","LAYER":"String","ELEVATION":"String","CLOSED_CON":"String"}},{"id":"Hala_Points","description":"","minzoom":12, "maxzoom":15,"fields":{"NAME":"String","LAYER":"String","GM_TYPE":"String","ELEVATION":"Number"}}];
    } else {
      vlayers = [{"id":"Contour","description":"","minzoom":11, "maxzoom":18,"fields":{"NAME":"String","LAYER":"String","ELEVATION":"String","CLOSED_CON":"String"}},{"id":"Contour_points","description":"","minzoom":12, "maxzoom":15,"fields":{"NAME":"String","LAYER":"String","GM_TYPE":"String","ELEVATION":"Number"}}];
    }
    
    // vlayers.forEach(function(el) {
    //     var layerId = el['id'];
    //     var colors = alphaColors(layerId);

    //     var style = {
    //         'Polygon': new ol.style.Style({
    //             fill: new ol.style.Fill({color: colors.polygon}),
    //             stroke: new ol.style.Stroke({color: colors.polygonOutline})
    //         }),
    //         'LineString': new ol.style.Style({
    //             stroke: new ol.style.Stroke({color: colors.line})
    //         }),
    //         'Point': new ol.style.Style({
    //             image: new ol.style.Circle({
    //                 fill: new ol.style.Fill({color: colors.circle}),
    //                 radius: 2
    //             })
    //         })
    //     };
    //     style['MultiPolygon'] = style['Polygon'];
    //     style['MultiLineString'] = style['LineString'];
    //     style['MultiPoint'] = style['Point'];

    //     layerStyleMap[layerId] = style;
    //     layerStyleVisibility[layerId] = true;

    //     var item = document.createElement('div');
    //     item.innerHTML = '<div style="' +
    //       'background:' + colors.default + ';' +
    //       '"></div> ' + layerId;

    //     item.addEventListener('click', function(e) {
    //         layerStyleVisibility[layerId] = !layerStyleVisibility[layerId];
    //         item.className = layerStyleVisibility[layerId] ? '' : 'hidden';
    //         layer.changed();
    //     });
    // });

    vlayers.forEach(function(el) {
      var layerId = el['id'];
      var colors = alphaColors(layerId);

      var style = {
        'Polygon': new ol.style.Style({
          fill: new ol.style.Fill({color: colors.polygon}),
          stroke: new ol.style.Stroke({color: colors.polygonOutline})
        }),
        'LineString': new ol.style.Style({
          stroke: new ol.style.Stroke({color: colors.line})
        }),
        'Point': new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({color: colors.circle}),
            radius: 2
          })
        })
      };
      style['MultiPolygon'] = style['Polygon'];
      style['MultiLineString'] = style['LineString'];
      style['MultiPoint'] = style['Point'];

      layerStyleMap[layerId] = style;
      layerStyleVisibility[layerId] = true;

      var item = document.createElement('div');
      item.innerHTML = '<div style="' +
      'background:' + colors.default + ';' +
      '"></div> ' + layerId;

      item.addEventListener('click', function(e) {
        layerStyleVisibility[layerId] = !layerStyleVisibility[layerId];
        item.className = layerStyleVisibility[layerId] ? '' : 'hidden';
        layer.changed();
      });
      //layerList.appendChild(item);
    });

    // Prepare vector layer
    layer = new ol.layer.VectorTile({
        //preload: Infinity,
        source: new ol.source.VectorTile({
            attributions: 'Maptiler Contour; Rendered with <a href="https://www.maptiler.com/desktop/">MapTiler Desktop</a>',
            format: new ol.format.MVT(),
            tileGrid: new ol.tilegrid.createXYZ({
                minZoom: mapMinZoom,
                maxZoom: mapMaxZoom,
                tileSize: 512,
            }),
            tilePixelRatio: 8,
            url: proxyUrl + imageUrls + "{z}/{x}/{y}.pbf",
        }),
        extent: mapExtent,
        style: function(feature, resolution) {
            var layerId = feature.get('layer');
            if (!layerStyleVisibility[layerId])
                return null;
            var style = layerStyleMap[layerId][feature.getType()];
            if (!style) {
                var colors = alphaColors(layerId);
                style = new ol.style.Style({
                    image: new ol.style.Circle({fill: new ol.style.Fill({color: colors.circle}), radius: 2.1}),
                    stroke: new ol.style.Stroke({color: colors.polygonOutline, width: 1})
                });
            }
            return [style];
        }
    });

    let centerOl;
    if (this.currentSiteData.id == 1) {
      centerOl = [56.153569, 25.498087];
    } else {
      centerOl = [52.292537, 24.520727];
    }

    map = new ol.Map({
        target: 'map',
        layers: [
            layer
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat(centerOl),
            zoom: 14,
            minZoom: mapMinZoom,
        })
    });

    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var overlay = new ol.Overlay({element: container});
    map.addOverlay(overlay);
    map.on('pointermove', function(e) {
        var html = '';
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
            var props = feature.getProperties();
            html += '<div class="inspect-layer">#' + props.layer + '</div>';
            for (var key in props) {
                if (key != 'layer') {
                    html += '<span class="inspect-row"><span class="inspect-name">' + key + '</span><span class="inspect-value">' + props[key] + '</span></span>';
                }
            }
        });
        if (html.length > 0) {
            content.innerHTML = html;
            overlay.setPosition(e.coordinate);
        } else {
            overlay.setPosition(undefined);
        }
    });
  }
}

export interface SiteData {
  orthoUrl:string,
  dsmUrl:string,
  contourUrl:string,
  potreeUrl:string,
  location:string,
  lat:number,
  lng:number,
  area:string,
  volumetric:string,
  minElevation:string,
  maxElevation:string,
  tifDownload:string,
  lasDownload:string,
  dxfDownload:string,
  dsmDownload:string,
  id:number
}
