#ifndef __LMLIB_H
#define __LMLIB_H

/** @defgroup lmlib lmlib
 * @{
 *
 * Functions related to low memory (first 1 MB of physical memory), required for BIOS
 */

/** @name  Memory Map Struct*/
/**@{
 *
 * Struct that keeps info regarding the mapping of physical memory to virtual memory
 */ 

typedef struct {
  phys_bytes phys;	/**< @brief physical address */
  void *virtual;	/**< @brief virtual address */
  unsigned long size;   /**< @brief size of memory region */
} mmap_t;

/** @} end of Memory Map Struct */

/**
 * @brief Initializes the low memory area, the region up to the 1 MByte physical address, by mapping it on the process' physical memory address
 * 
 * @return virtual address on which the first 1 MiB was mapped, NULL upon failure
 */
void *lm_init(void);

/**
 * @brief Allocates a memory block in low memory area with the specified size
 * 
 * Allocates a memory block in the region up to the 1 MByte physical address with the input size.
 *  Initializes the input mmap_t struct with the maping information, which can be read but must
 *  not be modified.
 * 
 * @param size size of the memory block to allocate
 * @param map pointer to mmap_t data structure, which represents the memory map
 * @return the virtual address of the memory block on success, NULL otherwise
 */
void *lm_alloc(unsigned long size, mmap_t *map);

/**
 * @brief Frees a memory block in the low memory area, previously allocated using lm_alloc()
 * 
 * Frees a memory block in the region up to the 1 MByte physical addess, previously
 *  allocated using lm_alloc(). Takes as input the address of the mmap_t structure that
 *  was passed to lm_alloc(), and that must have not been modified since.
 * 
 * @param map pointer to mmap_t data structure of the block being freed
 */
void lm_free(mmap_t *map);

#endif /*__LMLIB_H */
