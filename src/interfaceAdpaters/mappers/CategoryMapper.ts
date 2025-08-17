import { ICategoryEnity } from "@entities/models/category.entity";
import { CategoryDTO } from "@shared/dtos/user.dto";



 interface CategoryListItem {
  categoryId: string;
  title: string;
  image: string;
  status: string;
}

export const toCategoryResponse = (category: ICategoryEnity) : CategoryDTO => {
  return {
    _id:category._id,
    categoryId: category.categoryId, 
    title: category.title,
    image: category.image,
    status: category.status
  };
};



export const toCategoryListResponse = (categories: ICategoryEnity[]) : CategoryDTO[] => {
  return categories.map(toCategoryResponse);
};