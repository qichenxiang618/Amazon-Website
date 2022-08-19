import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import data from '../data';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload };
    default:
      return state;
  }
}

function HomeScreen() {
  const [{ products }, dispatch] = useReducer(logger(reducer), {
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Amazon.com</title>
      </Helmet>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
        data-interval="200"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="images/s1.jpg" class="d-block w-100" alt="1" />
          </div>
          <div class="carousel-item">
            <img src="images/s2.jpg" class="d-block w-100" alt="2" />
          </div>
          <div class="carousel-item">
            <img src="images/s3.jpg" class="d-block w-100" alt="3" />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>

      <h1>Featured Product</h1>
      <div className="products">
        <Row>
          {products.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default HomeScreen;
