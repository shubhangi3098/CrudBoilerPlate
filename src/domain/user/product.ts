import { eDataSource, GenericAppError, Result, UniqueEntityID, Entity } from '@softobiz-df/shared-lib'

interface ProductProps {
	productName: string	
}
export class Product extends Entity<ProductProps> {
	//#region member variables
	//#endregion

	//#region constants
	//#endregion

	//#region properties
	//#endregion

	//#region private methods
	private constructor(props: ProductProps, id?: UniqueEntityID) {
		super(props, id)
	}
	//#endregion

	//#region private setters
	private setName(productName: string){
		this._props.productName = productName
		return Result.ok(this)
	}
	
	//#endregion

	//#region public methods
	public static create(props: ProductProps, id?: UniqueEntityID, dataSource?: eDataSource) {
		if (dataSource === eDataSource.STORAGE) return Result.ok(new Product(props, id))
		const product = new Product(Object.create(null), id)
		const validationQueue = [
			product.setName(props.productName)	
		]
		const combinedResult = Result.combine(validationQueue)
		if (combinedResult.isFailure) return Result.fail<Product>(new GenericAppError.DomainError(combinedResult.errorValue()))
		return Result.ok(product)
	}
	//#endregion
}

