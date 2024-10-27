#include <iostream>

struct LL {
    int data;
    LL* next;
};

LL* reverse(LL* head) {
    LL* prev = nullptr;
    LL* current = head;
    LL* next = nullptr;

    while (current != nullptr) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }

    head = prev;
    return head;
}

void printLL(LL* head) {
    while (head != nullptr) {
        std::cout << head->data << " ";
        head = head->next;
    }
    std::cout << std::endl;
}

int main() {
    LL* head = new LL();
    head->data = 1;
    head->next = new LL();
    head->next->data = 2;
    head->next->next = new LL();
    head->next->next->data = 3;
    head->next->next->next = nullptr;
    printLL(head);
    LL* reversedHead = reverse(head);
    printLL(reversedHead);
}
