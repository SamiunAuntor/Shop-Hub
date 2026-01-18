import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

// GET all products
export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST new product
export async function POST(request) {
  try {
    // Check authentication (simple cookie check)
    const cookies = request.cookies;
    const authToken = cookies.get('auth-token');
    
    if (!authToken || authToken.value !== 'authenticated') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, price, category, image } = body;

    // Validation
    if (!name || !description || !price || !category || !image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read existing products
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);

    // Generate new ID
    const newId = (Math.max(...data.products.map(p => parseInt(p.id))) + 1).toString();

    // Create new product
    const newProduct = {
      id: newId,
      name,
      description,
      price: parseFloat(price),
      category,
      image,
    };

    // Add to products array
    data.products.push(newProduct);

    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json(
      { message: 'Product added successfully', product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
}

