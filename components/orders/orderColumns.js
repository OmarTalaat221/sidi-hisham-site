const style={
  border:"none",
  color:"#0388CC",
  fontSize:"13px",
  fontWeight:'lighter'
}

const columns = [
    {
      name: 'id',
      header: <h3 style={{fontWeight: '400'}}>ID</h3>,
      defaultFlex: 1,
      headerProps: { style: style }
    }
    ,
    {
      name: 'phone',
      header: <h3 style={{fontWeight: '400'}}>Phone</h3>,
      defaultFlex: 2,
      headerProps: { style: style }
    }
    ,
    {
      name: 'email',
      header: <h3 style={{fontWeight: '400'}}>Name / Email</h3>,
      defaultFlex: 3,
      headerProps: { style: style }
    }
    ,
    {
      name: 'products',
      header: <h3 style={{fontWeight: '400'}}>Products</h3>,
      defaultFlex: 1.5,
      headerProps: { style: style }
    }
    ,
    {
      name: 'adress',
      header: <h3 style={{fontWeight: '400'}}>Adress</h3>,
      defaultFlex: 2,
      headerProps: { style: style }
    }
    ,
    {
      name: 'date',
      header: <h3 style={{fontWeight: '400'}}>Date</h3>,
      defaultFlex: 2,
      headerProps: { style: style }
    }
    ,
    {
      name: 'total',
      header: <h3 style={{fontWeight: '400'}}>Total</h3>,
      defaultFlex: 2,
      headerProps: { style: style }
    }
    ,
    {
      name: 'points',
      header: <h3 style={{fontWeight: '400'}}>Points</h3>,
      defaultFlex: 2,
      headerProps: { style: style }
    }
    ,
    {
      name: 'status',
      header: <h3 style={{fontWeight: '400'}}>Status</h3>,
      defaultFlex: 2,
      headerProps: { style: style }
    }
    ,
    {
      name: 'view',
      header: <h3 style={{fontWeight: '400'}}></h3>,
      defaultFlex: 1,
      headerProps: { style: style }
    }
  ]

  export default columns