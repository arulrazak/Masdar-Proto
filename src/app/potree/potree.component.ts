import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';

@Component({
  selector: 'app-potree',
  templateUrl: './potree.component.html',
  styleUrls: ['./potree.component.scss']
})
export class PotreeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  ortho(){
    console.log("test")
  }
   Contour(){
     this.router.navigateByUrl('/dsm')
   }

   Mesh(){

   }

  //  tiff(){
  //    console.log("test")
  //    this.router.navigateByUrl('https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/Orthomosaic-Dataset/Hala_Ortho.tif/
  //    ')
  //  }
   tiff(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/Orthomosaic-Dataset/Hala_Ortho.tif');
    link.setAttribute('download', `products.tif`);
    document.body.appendChild(link);
    link.click();
    link.remove();
}
ias(){
  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', 'https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/Point-Cloud-Dataset/HalaPointCloudRaw.las');
  link.setAttribute('download', `products.tif`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

dxf(){
  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', 'https://aerodyne-masdar-data.s3.me-south-1.amazonaws.com/Contour-Line-Dataset/Contour.zip');
  link.setAttribute('download', `products.zip`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

}
