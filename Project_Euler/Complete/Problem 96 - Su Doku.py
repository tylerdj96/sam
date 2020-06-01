# By solving all fifty puzzles find the sum of the 3-digit numbers found in the top left corner of each solution grid; for example, 483 is the 3-digit number found in the top left corner of the solution grid above.

class Node(object):

    def __init__(self, data, id, left, right, up, down):
        self.data = data
        self.id = id
        self.left = left
        self.right = right
        self.up = up
        self.down = down


class DoubleList(object):
    head = None
    tail = None


    def append(self, data, id):
        new_node = Node(data, id, None, None, None, None)
        if self.head is None:
            self.head = self.tail = new_node
        else:
            new_node.left = self.tail
            new_node.right = None
            self.tail.right = new_node
            self.tail = new_node

    def remove(self, node_value):
        current_node = self.head

        while current_node is not None:
            if current_node.data == node_value:
                # if it's not the first element
                if current_node.left is not None:
                    current_node.left.right = current_node.right
                    current_node.right.left = current_node.left
                else:
                    # otherwise we have no left (it's None), head is the right one, and left becomes None
                    self.head = current_node.right
                    current_node.right.left = None

            current_node = current_node.right

    def show_lateral(self):
        print("Show list data:")
        current_node = self.head
        while current_node is not None:
            print("&" * 25)
            print(current_node.left.data if hasattr(current_node.left, "data") else None),
            print(current_node.data),
            print(current_node.right.data if hasattr(current_node.right, "data") else None)
            print("ID: ", current_node.id)
            current_node = current_node.right
        print("*" * 50)


class Spine(object):

<<<<<<< HEAD
    def __init__(self):


d = DoubleList()

d.append(5)
d.append(6)
d.append(50)
d.append(30)

d.show()

d.remove(50)
d.remove(5)

d.show()
=======
    keystone = Node("key", 0, None, None, None, None)
    spinelist = DoubleList()

    def __init__(self, constraints, options):
        x = 0
        while(x<((options**2)*constraints)):
            self.spinelist.append(options, x+1)
            x += 1
            self.spinelist.head.left = self.keystone

class RowIdentifier(object):
    row = None
    column = None
    value = None

    def __init__(self, r, c, v):
        self.row = r
        self.column = c
        self.value = v

# d = DoubleList()
#
# d.append(5)
# d.append(6)
# d.append(50)
# d.append(30)
#
# d.show()
#
# d.remove(50)
# d.remove(5)
#
# d.show()

testspine = Spine(3,2)

testspine.spinelist.show_lateral()
>>>>>>> 1dec7e185793ea689acc714a5758b006c552a453

def ingest_puzzle(file_name, puzzle_number):
    file = open(file_name, "rb")
    file.seek(8*puzzle_number+(90*(puzzle_number-1)), 1)
    mystr = file.read(90)
    return mystr.decode("utf-8")

def create_dlx_raw(constraints, options, raw_puzzle):
     # main_spine = Spine(3,2)
     # for i in range(0,(options**3)):
     #     new_row = DoubleList()
     #     for j in range(0, constraints):
     #         new_row.append()
     for i in range(1, options+1):
         new_row = DoubleList()
         for j in range(1, options+1):
             for k in range(1, options+1):
                 new_row_ID = RowIdentifier(i, j, k)
                 new_row.append(new_row_ID, )

print(ingest_puzzle("C:/Users/r633478/Project_Euler/Project_Euler/Provided Files/problem96_sudoku.txt", 3))