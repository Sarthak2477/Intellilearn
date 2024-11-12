let data = {
    bread_types: [
      {
        bread_type_id: 1,
        name: 'Sourdough',
        description: 'A tangy and chewy bread.',
        price: 3.5,
      },
      {
        bread_type_id: 2,
        name: 'Whole Wheat',
        description: 'Nutritious bread made from whole grain flour.',
        price: 2.5,
      },
      {
        bread_type_id: 3,
        name: 'Rye',
        description: 'Dense and hearty bread with a distinct flavor.',
        price: 3,
      },
      {
        bread_type_id: 4,
        name: 'Ciabatta',
        description: 'Italian bread with a crispy crust and soft interior.',
        price: 4,
      },
      {
        bread_type_id: 5,
        name: 'Focaccia',
        description: 'Flat oven-baked Italian bread, often seasoned with herbs.',
        price: 3.75,
      },
    ],
    employees: [
      {
        employee_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        hire_date: '2022-01-15T00:00:00.000Z',
      },
      {
        employee_id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        hire_date: '2023-05-20T00:00:00.000Z',
      },
      {
        employee_id: 3,
        first_name: 'Alice',
        last_name: 'Brown',
        email: 'alice.brown@example.com',
        hire_date: '2021-10-30T00:00:00.000Z',
      },
      {
        employee_id: 4,
        first_name: 'Bob',
        last_name: 'Johnson',
        email: 'bob.johnson@example.com',
        hire_date: '2023-06-11T00:00:00.000Z',
      },
      {
        employee_id: 5,
        first_name: 'Eve',
        last_name: 'Davis',
        email: 'eve.davis@example.com',
        hire_date: '2022-03-22T00:00:00.000Z',
      },
    ],
    customers: [
      {
        customer_id: 1,
        first_name: 'Michael',
        last_name: 'Wilson',
        email: 'michael.wilson@example.com',
        phone: '555-0123',
      },
      {
        customer_id: 2,
        first_name: 'Sarah',
        last_name: 'Taylor',
        email: 'sarah.taylor@example.com',
        phone: '555-0456',
      },
      {
        customer_id: 3,
        first_name: 'James',
        last_name: 'Anderson',
        email: 'james.anderson@example.com',
        phone: '555-0789',
      },
      {
        customer_id: 4,
        first_name: 'Linda',
        last_name: 'Thomas',
        email: 'linda.thomas@example.com',
        phone: '555-0912',
      },
      {
        customer_id: 5,
        first_name: 'Daniel',
        last_name: 'Martinez',
        email: 'daniel.martinez@example.com',
        phone: '555-1234',
      },
    ],
    orders: [
      {
        order_id: 1,
        customer_id: 1,
        employee_id: 2,
        order_date: '2023-10-01T17:34:56.000Z',
      },
      {
        order_id: 2,
        customer_id: 3,
        employee_id: 1,
        order_date: '2023-10-02T19:20:10.000Z',
      },
      {
        order_id: 3,
        customer_id: 2,
        employee_id: 4,
        order_date: '2023-10-03T14:15:00.000Z',
      },
      {
        order_id: 4,
        customer_id: 4,
        employee_id: 3,
        order_date: '2023-10-05T16:45:30.000Z',
      },
      {
        order_id: 5,
        customer_id: 5,
        employee_id: 2,
        order_date: '2023-10-06T21:00:00.000Z',
      },
    ],
    order_items: [
      {
        order_item_id: 1,
        order_id: 1,
        bread_type_id: 3,
        quantity: 2,
      },
      {
        order_item_id: 2,
        order_id: 1,
        bread_type_id: 5,
        quantity: 1,
      },
      {
        order_item_id: 3,
        order_id: 2,
        bread_type_id: 1,
        quantity: 1,
      },
      {
        order_item_id: 4,
        order_id: 2,
        bread_type_id: 2,
        quantity: 3,
      },
      {
        order_item_id: 5,
        order_id: 3,
        bread_type_id: 4,
        quantity: 2,
      },
      {
        order_item_id: 6,
        order_id: 4,
        bread_type_id: 5,
        quantity: 1,
      },
      {
        order_item_id: 7,
        order_id: 5,
        bread_type_id: 2,
        quantity: 4,
      },
      {
        order_item_id: 8,
        order_id: 5,
        bread_type_id: 1,
        quantity: 2,
      },
    ],
  };
  function temp(header: string, rows: any): string {
    let schema = `INSERT INTO ${header} `;
    let items[] = Object.keys(rows);
    items = items.join(", ")
    console.log(items)
    return schema;
  }
  
  Object.keys(data).forEach(function (k) {
    temp(k, data[k]);
  });
  