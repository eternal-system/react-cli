import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Content from '../components/Content'

/**
 * TODO
 *
 * 1. get list folder
 * 2. set list folder
 * 3.
 */

const Create = () => {
  const folder = []

  return (
    <Layout>
      <Header />
      <Content>
        {
          folder.length ? folder.map((el, i) => {
            return (
              <div key={i}>
                  name folder
              </div>
            )
          }) : 'Not found folder'
        }

      </Content>
      <Footer />
    </Layout>
  )
}

export default Create
