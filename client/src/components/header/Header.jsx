import "./header.css"
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit';
import photo1 from '../../image/banner1.jpg'
import photo2 from '../../image/banner2.jpg'
import photo3 from '../../image/banner3.jpg'

export default function Header() {
  return (
    <div>
      {/* <MDBCarousel showIndicators showControls fade>
      <MDBCarouselInner>
        <MDBCarouselItem className='active'>
          <MDBCarouselElement src={photo1} alt='...' />
          
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src={photo2} alt='...' />
          <MDBCarouselCaption>
            
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src={photo3} alt='...' />
          <MDBCarouselCaption>
            
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel> */}
    </div>
  )
}
