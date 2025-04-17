from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List



# Initialize the FastAPI app
app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend origin for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for validation
class Item(BaseModel):
    id: int
    name: str
    description: str

# In-memory "database" (to keep things simple)
fake_db = []

# Route to http://127.0.0.1:8000
@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI CRUD API!"}

# Route to get all items
@app.get("/items", response_model=List[Item])
def get_items():
    return fake_db

# Route to get a single item by ID
@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int):
    item = next((item for item in fake_db if item.id == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# Route to create a new item
@app.post("/items", response_model=Item)
def create_item(item: Item):
    fake_db.append(item)
    return item

# Route to update an existing item
@app.put("/items/{item_id}", response_model=Item)
def update_item(item_id: int, item: Item):
    existing_item = next((i for i in fake_db if i.id == item_id), None)
    if not existing_item:
        raise HTTPException(status_code=404, detail="Item not found")
    existing_item.name = item.name
    existing_item.description = item.description
    return existing_item

# Route to delete an item
@app.delete("/items/{item_id}", response_model=Item)
def delete_item(item_id: int):
    global fake_db
    item = next((i for i in fake_db if i.id == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    fake_db = [i for i in fake_db if i.id != item_id]
    return item

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)