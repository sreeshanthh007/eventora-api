import { ICategoryEnity } from "@entities/models/category.entity";
import { CategoryDTO } from "@shared/dtos/user.dto";



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




export function mapCategoryForFrontend(category: ICategoryEnity) {
  return {
   categoryId:category.categoryId.toString(),
    title: category.title
  };
}


export function mapCategoriesForFrontend(categories: ICategoryEnity[]) {
  return categories.map(mapCategoryForFrontend);
}