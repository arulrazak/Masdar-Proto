import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import{ Router, NavigationEnd } from '@angular/router'
import * as $ from 'jquery';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements AfterViewInit, OnInit {
  currentState;

  constructor( private router:Router) {}

  map:google.maps.Map;

  staticMarkers:MarkerData[] = [
  { 
    position: new google.maps.LatLng(25.500996, 56.152768), 
    title: "Al Hala Fujairah", 
    id: 1,
    area: "8.985 km",
    volumetric: "1.823 sq km",
    minElevation: "208.415 m",
    maxElevation: "593.284 m",
    image:"assets/image/mountain.jpg"  },
  { 
    position: new google.maps.LatLng(24.518458, 52.289941), 
    title: "Delma Island", 
    id: 2,
    area: "11.757 km",
    volumetric: "11.757 sq km",
    minElevation: "-1.562 m",
    maxElevation: "58.407 m",
    image:"assets/image/delma.jpg",
  }
  ];

  ngOnInit () {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/map') {
        console.log("ISMAPP");
        setTimeout(() => {
          this.ngAfterViewInit();
        },1000);
      }
    });
  }

  ngAfterViewInit(): void {
    // this.initMap();
    const env = this;
    (function () {

      const pos = new google.maps.LatLng(25.500996, 56.152768);
      const lightRustMapStyle: any = [
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
      }
      ];
      env.map = new google.maps.Map($('#map')[0], {
        center: pos,
        zoom: 12,
        styles: lightRustMapStyle,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false
      });

      let viewBounds = new google.maps.LatLngBounds();

      env.staticMarkers.forEach(markerData => {
        console.log("marker: ", markerData);

        const pos = markerData.position;
        const title = markerData.title;

        const area = markerData.area;
        const volumetric = markerData.volumetric;
        const minElevation = markerData.minElevation;
        const maxElevation = markerData.maxElevation;
        const image = markerData.image;
        const marker = new google.maps.Marker({
          position: pos,
          map: env.map,
          icon: 'assets/icon/icons8-marker-40.png',
          animation: google.maps.Animation.DROP
        });
        marker['tooltipContent'] = `
        <div class="card" style="width: 18rem;">
        <div class="card-header">` + title + `</div>
        <img src="`+ image +`" class="card-img-top" alt="image_site">
        <div class="card-body">
        <div class="details">
        <div class="details-table">
        <table>
        <tbody>
        <tr>
        <td>Area</td>
        <td><b>` + area + `<sup>2</sup></b></td>
        </tr>
        <tr>
        <td>Min Elevation</td>
        <td><b>` + minElevation + `</b></td>
        </tr>
        <tr>
        <td>Max Elevation</td>
        <td><b>` + maxElevation + `</b></td>
        </tr>
        </tbody>
        </table>
        </div>
        <div class="details-site-details">
        
        </div>
        </div>
        </div>
        </div>
        `;

        marker["markerData"] = markerData;
        google.maps.event.addListener(marker, 'mouseover', () => {
          const point = env.fromLatLngToPoint(marker.getPosition(), env.map);
          $('#marker-tooltip').html(marker['tooltipContent']).css({
            'left': point.x,
            'bottom': point.y
          }).show();
        });
        google.maps.event.addListener(marker, 'mouseout', () => {
          $('#marker-tooltip').hide();
        });

        // const env = this;
        google.maps.event.addListener(marker, 'click', () => {
          //window.location.href = '#/viewer';
          //console.log("markerData: ", marker["markerData"]);
          env.gotoSite(marker);
        });

        viewBounds.extend(pos);

      });

      

      env.map.fitBounds(viewBounds);  

      
    })();


    

  }

  fromLatLngToPoint(latLng, map) {
    const topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
    const bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    const scale = Math.pow(2, map.getZoom());
    const worldPoint = map.getProjection().fromLatLngToPoint(latLng);
    return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
  }

  gotoSite (marker) {
    console.log("CLICKED: ", marker);
    const routePath = "viewer/" + marker.markerData.id;
    this.router.navigateByUrl(routePath);
  }
}

export interface MarkerData {
  position:google.maps.LatLng,
  title:string,
  id:number,
  area:string,
  volumetric:string,
  minElevation:string,
  maxElevation:string,
  image:string,
}

